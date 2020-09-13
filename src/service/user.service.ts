import UserModel, { IUser } from '../models/user.model';

export const createUser = async (user: IUser): Promise<IUser> => {
  const newUser = await UserModel.create({ ...user });
  return newUser;
};

export const updateUser = async (user: IUser): Promise<IUser> => {
  const userInDB = await UserModel.findOneAndUpdate({ _id: user._id }, { ...user });
  if (!userInDB) {
    throw Error('Unable to update user');
  }
  return userInDB;
};

export const deleteUser = async (user: IUser): Promise<void> => {
  const userInDB = await UserModel.findOneAndUpdate({ _id: user._id }, { deleted: true });
  if (!userInDB) {
    throw Error('Unable to delete user');
  }
};

export const getUserById = async (id: string): Promise<IUser> => {
  const user = await UserModel.findById(id);
  if (!user) {
    throw Error('User Not found');
  }
  return user;
};

interface QueryOptions {
  page: number;
  size: number;
}
interface GetAllUserResponse {
  count: number;
  users: IUser[];
}

export const getAllUser = async (options: QueryOptions): Promise<GetAllUserResponse> => {
  const users = await UserModel.find();
  const count = await UserModel.count({});
  return {
    count,
    users,
  };
};
