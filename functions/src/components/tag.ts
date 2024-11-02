import { admin, db } from "../config/firebase";
import { onDocumentDeleted } from "firebase-functions/firestore";

export const deleteTag = onDocumentDeleted("groups/{groupId}/tags/{tagId}", async (event) => {
  const events = await db.collection("groups").doc(event.params.groupId).collection("events").get();
  const docRef = db.collection("groups").doc(event.params.groupId).collection("tags").doc(event.params.tagId);
  for (const e of events.docs) {
    await db
      .collection("groups")
      .doc(event.params.groupId)
      .collection("events")
      .doc(e.id)
      .update({ tags: admin.firestore.FieldValue.arrayRemove(docRef) });
  }
});
