import * as functions from "firebase-functions";
import {db} from "../config/firebase";

export const createUser = functions.auth.user().onCreate(async (user) => {
  await db.collection("users").doc(user.uid).set({email: user.email});
});
