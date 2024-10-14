import { Role } from "./Role";
import { University } from "./University";

export type MemberId = string;

export interface MemberModel {
  id: MemberId;
  name: string;
  year: number;
  role: string;
  campus: University;
}

export interface SubmitMemberModel {
  name: string;
  year: number;
  role: string;
  campus: University;
}

export const InitSubmitMember = (campus: University) => ({
  name: "",
  year: 1,
  role: Role.Member,
  campus,
});
