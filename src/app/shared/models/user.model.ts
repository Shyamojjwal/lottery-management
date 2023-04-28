export interface IUser {
  id: number;
  userCode: string;
  userName: string;
  firstName: string;
  lastName: string;
  fullName?:string;
  email:string;
  phoneNo: string;
  userCategory: string;
  address: string;
}