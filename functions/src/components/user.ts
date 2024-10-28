import { beforeUserCreated } from "firebase-functions/identity";
import { db } from "../config/firebase";

export const createUser = beforeUserCreated({ region: "australia-southeast1" }, async (event) => {
  if (event.data) {
    await db.collection("users").doc(event.data.uid).set({ email: event.data.email });
  }
});
