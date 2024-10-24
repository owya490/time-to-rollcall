"use client";
import Topbar from "@/components/Topbar";
import { Path } from "@/helper/Path";
import { UserContext } from "@/lib/context";
import { firestore } from "@/lib/firebase";
import { MemberModel } from "@/models/Member";
import {
  DocumentReference,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function GroupAdmin() {
  const user = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      if (user?.role !== "admin") {
        router.push(Path.Group);
      }
    }
    // eslint-disable-next-line
  }, [user]);

  // const changeMembersForGroup = async (groupId: string) => {
  //   const events = await getDocs(
  //     collection(firestore, "groups", groupId, "events")
  //   );
  //   for (const event of events.docs) {
  //     const data = event.data();
  //     if (data.members) {
  //       await updateDoc(doc(firestore, "groups", groupId, "events", event.id), {
  //         members: data.members.map((m: DocumentReference) => ({
  //           member: m,
  //           signInTime: data.dateStart,
  //         })),
  //       });
  //     }
  //   }
  // };

  const changeMembers = async () => {
    console.log("start");
    // await changeMembersForGroup("ccSgQTXvLRnin0OjwvRM");
    console.log("end");
  };

  return (
    user && (
      <>
        <Topbar />
        <div className="mx-4">
          <h1 className="text-2xl text-gray-700 mb-4">Admin Page</h1>
          <button
            type="button"
            className="p-2 bg-slate-200"
            onClick={() => changeMembers()}
          >
            Change Members
          </button>
        </div>
      </>
    )
  );
}
