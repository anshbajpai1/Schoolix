import { prepareAndroidGoogleServices } from "./runtime-env.mjs";

await prepareAndroidGoogleServices(process.cwd());
console.log("Prepared ignored Android Firebase configuration from environment.");
