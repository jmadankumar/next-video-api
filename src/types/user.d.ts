export enum Gender {
  MALE = 0,
  FEMALE = 1,
  OTHERS = 2,
}

export interface UserDTO {
  email: string;
  name: string;
  gender: string;
  dob: Date;
  imageUrl: string;
  password?: string;
}
