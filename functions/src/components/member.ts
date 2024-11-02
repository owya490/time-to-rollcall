import { admin, db } from "../config/firebase";
import { onDocumentDeleted } from "firebase-functions/firestore";

export const deleteMember = onDocumentDeleted("groups/{groupId}/members/{year}/members/{memberId}", async (event) => {
  const events = await db.collection("groups").doc(event.params.groupId).collection("events").get();
  const docRef = db
    .collection("groups")
    .doc(event.params.groupId)
    .collection("members")
    .doc(event.params.year)
    .collection("members")
    .doc(event.params.memberId);
  for (const e of events.docs) {
    await db
      .collection("groups")
      .doc(event.params.groupId)
      .collection("events")
      .doc(e.id)
      .update({ members: admin.firestore.FieldValue.arrayRemove(docRef) }); // TODO: can't remove since we don't know timestamp
  }
});
