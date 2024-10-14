import { getApp, initializeApp } from "firebase/app";
import { GoogleAuthProvider, OAuthProvider, getAuth } from "firebase/auth";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import {
  DocumentReference,
  DocumentSnapshot,
  Timestamp,
  getDoc,
  getFirestore,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";

// export const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyDp6gXIb4s6c43jiFk3-vMfh8RtHwdYHX0",
  authDomain: "timetorollcall.firebaseapp.com",
  projectId: "timetorollcall",
  storageBucket: "timetorollcall.appspot.com",
  messagingSenderId: "242180253857",
  appId: "1:242180253857:web:d96b375b23cbfb6b9668e0",
  measurementId: "G-0WVS694BHZ",
};
function createFirebaseApp(config: any) {
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
export const microsoftProvider = new OAuthProvider("microsoft.com");
microsoftProvider.setCustomParameters({
  prompt: "consent",
  tenant: "977dce0e-7408-4dba-9ff5-c55073be357d",
});

// Firestore exports
export const firestore = getFirestore(firebaseApp);
// Storage exports
export const storage = getStorage(firebaseApp);
export const STATE_CHANGED = "state_changed";

/// Helper functions
export async function convertToJavascript(document: DocumentSnapshot) {
  let data = document.data();
  if (!data) {
    return undefined;
  }
  data["id"] = document.id;
  for (const [key, value] of Object.entries(data)) {
    if (value instanceof Timestamp) {
      data[key] = value.toDate();
    } else if (value instanceof DocumentReference) {
      data[key] = await getDoc(value);
    } else if (
      Array.isArray(value) &&
      value.every((item) => item instanceof DocumentReference)
    ) {
      data[key] = (
        await Promise.all(
          value.map(async (v) => convertToJavascript(await getDoc(v)))
        )
      ).filter((v) => v !== undefined);
    } else {
      data[key] = value;
    }
  }
  return data;
}

export function convertToFirestore(data: { id: string }) {
  const { id, ...dataWithoutId } = data;
  return dataWithoutId;
}

export async function convertCollectionToJavascript(docs: DocumentSnapshot[]) {
  return (
    await Promise.all(docs.map((doc) => convertToJavascript(doc)))
  ).filter((d) => d !== undefined);
}
