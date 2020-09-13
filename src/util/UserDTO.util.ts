import { IUser } from '../models/user.model';
import { UserDTO } from '../types/user';

export const fromIUser = (user: IUser): UserDTO => {
  const { email, name, dob, imageUrl } = user;
  return { email, name, dob, imageUrl, gender: user.getGender() };
};

const UserDTOUtil = {
  fromIUser,
};

export default UserDTOUtil;
