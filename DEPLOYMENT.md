# ValCare Deployment

The app uses Firebase project `valscarea1`. The frontend can be served by Firebase Hosting or GitHub Pages at `steveokyere910.github.io/ValGlam/`.

## First-time setup

1. Install the Firebase CLI: `npm install -g firebase-tools`
2. Sign in: `firebase login`
3. From this folder, deploy the app and Firestore rules:

```text
firebase deploy --only hosting,firestore:rules,functions
```

## Paystack payments

The Paystack secret key must stay in Firebase Functions Secret Manager. Never add it to `app.jsx`, `firebase.js`, HTML, Firestore, or any file deployed by Hosting. The live public key is configured in `firebase.js`; it is safe to expose in frontend code, but the current hosted redirect checkout still authenticates server-side with the secret key.

Firebase Functions Secret Manager requires the Blaze (pay-as-you-go) plan. Upgrade the Firebase project before setting the secret. In Firebase Console, also add `steveokyere910.github.io` under Authentication > Settings > Authorized domains when using GitHub Pages.

1. Revoke and replace the live secret key that was shared in chat. Treat it as compromised.
2. From this folder, install the Functions dependencies and store the replacement key:

```text
cd functions
npm install
cd ..
firebase functions:secrets:set PAYSTACK_SECRET_KEY
```

New-product and restock updates use free in-app notifications stored in Firestore. They appear under the bell icon for signed-in users. No email provider, API key, or paid Firebase plan is required.

Paste the replacement secret only into the terminal prompt. Then deploy:

```text
firebase deploy --only functions,hosting,firestore:rules
```

Checkout amounts are recalculated from the server-side product catalog, and Paystack references are verified with the secret before an order is written. The Firestore rules reject browser-created orders. Keep the Paystack dashboard in live mode only after testing with test keys in a separate Firebase project.

## Publishing code changes

After editing `app.jsx`, `styles.css`, `index.html`, `firebase.js`, or `vals.jpg`, run:

```text
firebase deploy --only hosting
```

After changing `firestore.rules`, run:

```text
firebase deploy --only firestore:rules
```

The asset versions in `index.html` are updated when frontend code or styles change, so browsers load the newest files after deployment.

## Secure admin provisioning

The website permits one direct admin setup only for the allowlisted owner email configured in `app.jsx` and `firestore.rules`. After the setup marker is created, the admin option disappears and cannot be used again. For a stronger production setup, admin privileges can also be assigned from a trusted Admin SDK environment:

```js
await admin.auth().setCustomUserClaims(USER_UID, { admin: true });
```

For this project, install the Admin SDK in a private working environment and run:

```text
npm install firebase-admin
node set-admin.mjs admin@example.com
```

The command uses Application Default Credentials. Set `GOOGLE_APPLICATION_CREDENTIALS` to a service-account JSON file kept outside the hosted folder before running it.

Never place a service-account key, Admin SDK code, or an admin secret in this frontend folder. After the claim is assigned, the admin must sign out and sign in again so Firebase refreshes the ID token. The Firestore rules accept privileged requests only when the verified token contains `admin: true`.

## Developer access

Each developer needs access to the Firebase project in Firebase Console under **Project settings > Users and permissions**. Give only the role required for their work. Hosting and Firestore deployments require Firebase CLI access to the project.
