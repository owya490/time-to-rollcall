import { MetadataModelId, MetadataModelValueId } from "./Metadata";

export interface MemberMetadataModel {
  [key: MetadataModelId]: MetadataModelValueId;
}

export type MemberId = string;

export interface MemberModel {
  id: MemberId;
  name: string;
  metadata?: MemberMetadataModel;
}

export const InitMember = (name: string): MemberModel => ({
  id: "placeholder",
  name,
});

export const getYearString = (year?: string) => {
  switch (year) {
    case "1":
      return "1st Year";
    case "2":
      return "2nd Year";
    case "3":
      return "3rd Year";
    case "4":
      return "4th Year";
    case "5":
      return "5th Year";
    case "6+":
      return "6th Year+";
    default:
      return "Member";
  }
};

export function compareMetadata(
  obj1?: { [key: MetadataModelId]: MetadataModelValueId },
  obj2?: { [key: MetadataModelId]: MetadataModelValueId }
): boolean {
  if (obj1 === undefined && obj2 === undefined) return true;
  if (obj1 === undefined || obj2 === undefined) return false;
  // Get the keys of both objects
  const obj1Keys = Object.keys(obj1);
  const obj2Keys = Object.keys(obj2);

  // Check if the number of keys is different
  if (obj1Keys.length !== obj2Keys.length) {
    return false;
  }

  // Check if keys and values are equal
  for (let key of obj1Keys) {
    // Check if the key exists in the second object and the values are equal
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }

  // If all keys and values are the same, return true
  return true;
}
