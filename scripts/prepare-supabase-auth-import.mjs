import fs from "node:fs";
import crypto from "node:crypto";

const INPUT = process.env.INPUT || "firebase-auth-export.json";
const OUTPUT = process.env.OUTPUT || "supabase-auth-import-payload.json";

function tempPassword() {
  return `Schoolix-${crypto.randomUUID()}-Reset!`;
}

const input = JSON.parse(fs.readFileSync(INPUT, "utf8"));
const sourceUsers = input.users || [];
const users = sourceUsers
  .filter((user) => user.email)
  .map((user) => ({
    firebaseUid: user.localId,
    email: String(user.email).toLowerCase(),
    displayName: user.displayName || "",
    phoneNumber: user.phoneNumber || "",
    temporaryPassword: tempPassword(),
  }));

fs.writeFileSync(OUTPUT, JSON.stringify({ users }, null, 2));
console.log(`Prepared ${users.length} users in ${OUTPUT}`);
