import { DocumentReference } from "firebase-admin/firestore";
import { db } from "../config/firebase";
import { onDocumentDeleted } from "firebase-functions/firestore";

export const deleteMember = onDocumentDeleted(
  { region: "australia-southeast1", document: "groups/{groupId}/members/{year}/members/{memberId}" },
  async (event) => {
    const events = await db.collection("groups").doc(event.params.groupId).collection("events").get();
    const docRef = db
      .collection("groups")
      .doc(event.params.groupId)
      .collection("members")
      .doc(event.params.year)
      .collection("members")
      .doc(event.params.memberId);
    for (const e of events.docs) {
      const eData = (
        await db.collection("groups").doc(event.params.groupId).collection("events").doc(e.id).get()
      ).data();
      if (eData?.members) {
        const filteredMembers = eData?.members.filter((m: { member: DocumentReference }) => m.member === docRef);
        await db
          .collection("groups")
          .doc(event.params.groupId)
          .collection("events")
          .doc(e.id)
          .update({ members: filteredMembers });
      }
    }
  }
);
