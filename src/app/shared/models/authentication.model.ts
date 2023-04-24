export interface IAuthResult {
  userRole?: string;
  userId: string;
  profileImg?: string;
  salutation?: string;
  firstName: string;
  lastName: string;
  fullName: string;
  token: string;
  status: 'A' | 'I' | 'D';
}