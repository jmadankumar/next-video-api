export interface UserDTO {
  id: string;
  email: string;
  name: string;
  gender: string;
  dob: Date;
  imageUrl: string;
  password?: string;
}
