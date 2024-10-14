export enum University {
  USYD = "University of Sydney",
  UNSW = "University of New South Wales",
  UTS = "University of Technology, Sydney",
  MACQ = "Macquarie University",
  ACU = "Australian Catholic University",
}

export function getUniversityKey(value: University): string {
  return Object.keys(University).find(
    (key) => University[key as keyof typeof University] === value
  ) as string;
}

export const universities = Object.values(University);
