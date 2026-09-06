import admin from "firebase-admin";

const email = process.argv[2]?.trim().toLowerCase();

if (!email) {
  console.error("Usage: node set-admin.mjs admin@example.com");
  process.exit(1);
}

admin.initializeApp();

try {
  const user = await admin.auth().getUserByEmail(email);
  await admin.auth().setCustomUserClaims(user.uid, { ...user.customClaims, admin: true });
  console.log(`Admin access granted to ${email}. Sign out and sign in again in the web app.`);
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
