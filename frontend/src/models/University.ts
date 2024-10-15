export enum University {
  USYD = "University of Sydney",
  UNSW = "University of New South Wales",
  UTS = "University of Technology, Sydney",
  MACQ = "Macquarie University",
  ACU = "Australian Catholic University",
}

export const universityColours: Record<University, string> = {
  [University.USYD]: "#B5403D",
  [University.UNSW]: "#619445",
  [University.UTS]: "#3B5499",
  [University.MACQ]: "#F2C259",
  [University.ACU]: "#57427A",
};

export function getUniversityKey(value: University): string | undefined {
  return Object.keys(University).find(
    (key) => University[key as keyof typeof University] === value
  );
}

export const universities = Object.values(University);
