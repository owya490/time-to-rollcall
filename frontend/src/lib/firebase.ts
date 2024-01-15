import { getApp, initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import { DocumentSnapshot, Timestamp, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

function createFirebaseApp(config) {
  try {
    return getApp();
  } catch {
    return initializeApp(config);
  }
}

// const firebaseApp = initializeApp(firebaseConfig);
const firebaseApp = createFirebaseApp(firebaseConfig);

// Auth exports
// export const auth = firebase.auth();
export const auth = getAuth(firebaseApp);
export const googleAuthProvider = new GoogleAuthProvider();

// Firestore exports
export const firestore = getFirestore(firebaseApp);
// Storage exports
export const storage = getStorage(firebaseApp);
export const STATE_CHANGED = "state_changed";

/// Helper functions
export function convertToJavascript(doc: DocumentSnapshot) {
  let data = doc.data();
  data["id"] = doc.id;
  for (const [key, value] of Object.entries(data)) {
    data[key] = value instanceof Timestamp ? value.toDate() : value;
  }
  return data;
}

export function convertToFirestore(data: { id: string }) {
  const { id, ...dataWithoutId } = data;
  return dataWithoutId;
}

export function convertCollectionToJavascript(docs: DocumentSnapshot[]) {
  return docs.map((doc) => convertToJavascript(doc));
}
