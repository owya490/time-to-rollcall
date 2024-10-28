import * as functions from "firebase-functions";
import { db } from "../config/firebase";

export const rolloverUsers = functions
  .runWith({ timeoutSeconds: 120 })
  .pubsub.schedule("0 0 1 1 *")
  .timeZone("Australia/Sydney")
  .onRun(async () => {
    const currentYear = new Date().getFullYear();
    const lastYear = currentYear - 1;

    const groups = await db.collection("groups").get();
    for (const group of groups.docs) {
      const lastYearMembers = await db
        .collection("groups")
        .doc(group.id)
        .collection("members")
        .doc(lastYear.toString())
        .collection("members")
        .get();
      for (const lym of lastYearMembers.docs) {
        let metadata = lym.data().metadata;
        if (metadata && metadata["U65Ey0liZ6OeVqSusDtN"] !== "6+") {
          if (metadata["U65Ey0liZ6OeVqSusDtN"] === "5") {
            metadata["U65Ey0liZ6OeVqSusDtN"] = "6+";
          } else {
            metadata["U65Ey0liZ6OeVqSusDtN"] = (Number(metadata["U65Ey0liZ6OeVqSusDtN"]) + 1).toString();
          }
        }
        await db
          .collection("groups")
          .doc(group.id)
          .collection("members")
          .doc(currentYear.toString())
          .collection("members")
          .doc(lym.id)
          .set({ ...lym.data(), metadata });
      }
    }
  });
