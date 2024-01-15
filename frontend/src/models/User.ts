export interface User {
  uid: string;
  email: string;
  groups: string[];
  photoURL?: string;
  displayName?: string;
}
