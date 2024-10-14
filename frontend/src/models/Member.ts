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

export const InitSubmitMember = (campus: University) => ({
  name: "",
  year: 1,
  role: Role.Member,
  campus,
});

export const InitMember = (campus: University): MemberModel => ({
  id: "placeholder",
  name: "",
  year: 1,
  role: Role.Member,
  campus,
});
