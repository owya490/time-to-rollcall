import { Role } from "./Role";
import { University } from "./University";

export type MemberId = string;

export interface MemberModel {
  id: MemberId;
  name: string;
  year: number;
  role: Role;
  campus: University;
}

export interface SubmitMemberModel {
  name: string;
  year: number;
  role: Role;
  campus: University;
}

export const InitMember = (name: string, campus: University): MemberModel => ({
  id: "placeholder",
  name,
  year: 1,
  role: Role.Member,
  campus,
});

export const getYearString = (year?: number) => {
  switch (year) {
    case 1:
      return "1st Year";
    case 2:
      return "2nd Year";
    case 3:
      return "3rd Year";
    case 4:
      return "4th Year";
    case 5:
      return "5th Year";
    default:
      return year ? year.toString() + "th Year+" : "Student";
  }
};
