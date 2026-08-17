import { getAuth, getFirestore, initializeApp, getApps } from "./firebase-compat.js";

const app = getApps().length ? getApps()[0] : initializeApp({
  backend: "supabase",
  projectId: "ezkmeedcqetztkeppxil",
});

export const auth = getAuth(app);
export const db = getFirestore(app);
 