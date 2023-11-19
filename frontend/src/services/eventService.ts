import { firestore } from "@/lib/firebase";
import {
  addDoc,
  collection,
  deleteField,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { Attendee, AttendeeId } from "interfaces/AttendeeTypes";
import { EventId, GroupId } from "interfaces/EventTypes";

export async function getAttendanceList(eventId: EventId): Promise<Attendee[]> {
  const snapshot = await getDocs(collection(firestore, "Events", eventId));
  const attendanceList = [];
  snapshot.forEach((doc) => {
    attendanceList.push(doc.data() as Attendee);
  });
  return attendanceList;
}

export async function setAttendeeGoing(
  groupId: GroupId,
  eventId: EventId,
  attendeeId: AttendeeId
) {
  updateDoc(doc(firestore, "Events", eventId), {
    attendeesList: { attendeeId: true },
  });
  updateDoc(doc(firestore, "Attendee", attendeeId, groupId), {
    eventId: true,
  });
}

export async function addAttendeeGoing(
  groupId: GroupId,
  eventId: EventId,
  firstName: string,
  lastName: string
) {
  addDoc(collection(firestore, "Groups", groupId), {
    firstName: firstName,
    lastName: lastName,
  } as Attendee).then((doc) => {
    setAttendeeGoing(groupId, eventId, doc.id);
  });
}

export async function removeAttendeeGoing(
  groupId: GroupId,
  eventId: EventId,
  attendeeId: AttendeeId
) {
  updateDoc(doc(firestore, "Events", eventId), {
    attendeesList: { attendeeId: deleteField() },
  });
  updateDoc(doc(firestore, "Attendee", attendeeId, groupId), {
    eventId: deleteField(),
  });
}
