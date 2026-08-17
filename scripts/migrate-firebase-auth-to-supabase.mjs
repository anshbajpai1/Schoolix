import fs from "node:fs";
import process from "node:process";
import { cert, initializeApp } from "firebase-admin/app";
import { getAuth as getFirebaseAuth } from "firebase-admin/auth";
import { createClient } from "@supabase/supabase-js";

const {
  FIREBASE_SERVICE_ACCOUNT,
  FIREBASE_SERVICE_ACCOUNT_PATH,
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY,
  DRY_RUN = "true",
} = process.env;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error("Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY before running this script.");
}

function readServiceAccount() {
  if (FIREBASE_SERVICE_ACCOUNT) return JSON.parse(FIREBASE_SERVICE_ACCOUNT);
  if (FIREBASE_SERVICE_ACCOUNT_PATH) return JSON.parse(fs.readFileSync(FIREBASE_SERVICE_ACCOUNT_PATH, "utf8"));
  throw new Error("Set FIREBASE_SERVICE_ACCOUNT or FIREBASE_SERVICE_ACCOUNT_PATH.");
}

function tempPassword() {
  return `Schoolix-${crypto.randomUUID()}-Reset!`;
}

initializeApp({ credential: cert(readServiceAccount()) });

const firebaseAuth = getFirebaseAuth();
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

const output = [];
let pageToken;

do {
  const page = await firebaseAuth.listUsers(1000, pageToken);
  for (const firebaseUser of page.users) {
    if (!firebaseUser.email) continue;
    const password = tempPassword();
    output.push({
      firebaseUid: firebaseUser.uid,
      email: firebaseUser.email,
      displayName: firebaseUser.displayName || "",
      temporaryPassword: password,
    });
    if (DRY_RUN === "true") continue;
    const { error } = await supabase.auth.admin.createUser({
      email: firebaseUser.email,
      password,
      email_confirm: true,
      user_metadata: {
        firebaseUid: firebaseUser.uid,
        displayName: firebaseUser.displayName || "",
        phoneNumber: firebaseUser.phoneNumber || "",
        provider: "firebase-migration",
      },
    });
    if (error && !String(error.message).includes("already registered")) {
      throw new Error(`${firebaseUser.email}: ${error.message}`);
    }
  }
  pageToken = page.pageToken;
} while (pageToken);

fs.writeFileSync("supabase-auth-migration-users.json", JSON.stringify(output, null, 2));

console.log(`${DRY_RUN === "true" ? "Prepared" : "Migrated"} ${output.length} Firebase Auth users.`);
console.log("Wrote supabase-auth-migration-users.json.");
console.log("Firebase password hashes cannot be read through Firebase Admin SDK, so existing passwords cannot be preserved here.");
console.log("Use the generated temporary passwords for a controlled reset campaign, or configure Supabase's Firebase Auth migration path if hash export is available from your Firebase project.");
