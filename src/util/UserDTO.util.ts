import { IUser } from '../types/model/user-model';
import { UserDTO } from '../types/dto/user';

export const fromIUser = (user: IUser): UserDTO => {
  const { email, name, dob, imageUrl, _id } = user;
  return { id: _id, email, name, dob, imageUrl, gender: user.getGender() };
};

const UserDTOUtil = {
  fromIUser,
};

export default UserDTOUtil;
