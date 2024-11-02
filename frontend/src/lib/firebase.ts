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
  initializeFirestore,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
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
export const firestore = initializeFirestore(firebaseApp, {
  ignoreUndefinedProperties: true,
});
// Storage exports
export const storage = getStorage(firebaseApp);
export const STATE_CHANGED = "state_changed";

async function convertObjectFields(obj: any) {
  for (const [key, value] of Object.entries(obj)) {
    const v = await handleField(value);
    if (v === undefined) {
      return undefined;
    }
    obj[key] = v;
  }
  return obj;
}

async function handleField(value: any): Promise<any | undefined> {
  if (value instanceof Timestamp) {
    return value.toDate();
  } else if (value instanceof DocumentReference) {
    const docData = await getDoc(value);
    return convertToJavascript(docData);
  } else if (Array.isArray(value)) {
    return (await Promise.all(value.map(handleField))).filter(
      (d) => d !== undefined
    );
  } else if (typeof value === "object" && value !== null) {
    return convertObjectFields(value);
  }
  return value;
}

/// Helper functions
export async function convertToJavascript(
  document: DocumentSnapshot,
  dontHandleField?: string
) {
  let data = document.data();
  if (!data) {
    return undefined;
  }
  for (const [key, value] of Object.entries(data)) {
    if (key !== dontHandleField) {
      const v = await handleField(value);
      if (v !== undefined) {
        data[key] = v;
      }
    }
  }
  data["id"] = document.id;
  data["docRef"] = document.ref;
  return data;
}

export function convertToFirestore(data: {
  id: string;
  docRef?: DocumentReference;
}) {
  const { id, docRef, ...dataWithoutId } = data;
  return dataWithoutId;
}

export async function convertCollectionToJavascript(
  docs: DocumentSnapshot[],
  dontHandleField?: string
) {
  return (
    await Promise.all(
      docs.map((doc) => convertToJavascript(doc, dontHandleField))
    )
  ).filter((d) => d !== undefined);
}
