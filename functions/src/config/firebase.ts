import * as admin from "firebase-admin";

admin.initializeApp();

const db = admin.firestore();
const auth = admin.auth();

db.settings({ ignoreUndefinedProperties: true });

export { admin, db, auth };
