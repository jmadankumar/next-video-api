import { IUser } from '../models/user.model';
import { UserDTO } from '../types/user';

export const fromIUser = (user: IUser): UserDTO => {
  const { email, name, dob, imageUrl, _id } = user;
  return { id: _id, email, name, dob, imageUrl, gender: user.getGender() };
};

const UserDTOUtil = {
  fromIUser,
};

export default UserDTOUtil;
