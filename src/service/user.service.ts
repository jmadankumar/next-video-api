import UserModel from '../models/user.model';
import { UserDTO } from '../types/user';
import { parseGender } from '../util/gender.util';
import UserDTOUtil from '../util/user.util';

const createUser = async (userDTO: UserDTO): Promise<UserDTO> => {
  const newUser = await UserModel.create({
    ...userDTO,
    password: 'test',
    gender: parseGender(userDTO.gender),
    authProvider: 'local',
  });
  return UserDTOUtil.fromIUser(newUser);
};

const updateUser = async (userDTO: UserDTO): Promise<UserDTO> => {
  const userInDB = await UserModel.findOneAndUpdate(
    { _id: userDTO.id },
    { ...userDTO, gender: parseGender(userDTO.gender) },
  );
  if (!userInDB) {
    throw Error('Unable to update user');
  }
  return getUserById(userInDB.id);
};

const deleteUser = async (user: UserDTO): Promise<void> => {
  const userInDB = await UserModel.findOneAndUpdate({ _id: user.id }, { deleted: true });
  if (!userInDB) {
    throw Error('Unable to delete user');
  }
};

const getUserById = async (id: string): Promise<UserDTO> => {
  const user = await UserModel.findById(id);
  if (!user) {
    throw Error('User Not found');
  }
  return UserDTOUtil.fromIUser(user);
};

interface QueryOptions {
  page: number;
  size: number;
}

const getAllUser = async (options: QueryOptions): Promise<UserDTO[]> => {
  const users = await UserModel.find();

  return users.map((user) => UserDTOUtil.fromIUser(user));
};

const getAllUserCount = async (options: QueryOptions): Promise<number> => {
  const count = await UserModel.count({});
  return count;
};

const removeUserFromDB = async (id: string): Promise<void> => {
  await UserModel.findByIdAndDelete(id);
};

const UserService = {
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  getAllUser,
  getAllUserCount,
  removeUserFromDB
};

export default UserService;
