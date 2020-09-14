import { Request, Response } from 'express';
import UserService from '../service/user.service';
import {
  CreateUserResponse,
  DeleteUserResponse,
  GetAllUserResponse,
  GetUserByIdResponse,
  UpdateUserResponse,
} from '../types/api/user-api';
import { UserDTO } from '../types/dto/user';

const createUser = async (
  req: Request<null, null, UserDTO>,
  res: Response<CreateUserResponse>,
): Promise<void> => {
  const userDTO = req.body;
  const user = await UserService.createUser(userDTO);
  res.status(200).json({
    message: 'User created',
    user,
  });
};

const updateUser = async (
  req: Request<null, null, UserDTO>,
  res: Response<UpdateUserResponse>,
): Promise<void> => {
  const userDTO = req.body;
  const user = await UserService.updateUser(userDTO);
  res.status(200).json({
    message: 'User created',
    user,
  });
};

const getUserById = async (req: Request, res: Response<GetUserByIdResponse>): Promise<void> => {
  const { id } = req.params;
  const user = await UserService.getUserById(id);
  res.status(200).json({
    user,
  });
};

const getAllUser = async (req: Request, res: Response<GetAllUserResponse>): Promise<void> => {
  const users = await UserService.getAllUser({ page: 0, size: 10 });
  const count = await UserService.getAllUserCount({ page: 0, size: 10 });
  res.status(200).json({
    users,
    count,
  });
};

const deleteUser = async (
  req: Request<null, null, UserDTO>,
  res: Response<DeleteUserResponse>,
): Promise<void> => {
  const user = req.body;
  await UserService.deleteUser(user);
  res.status(200).json({
    message: 'User deleted',
  });
};

const UserController = {
  createUser,
  updateUser,
  getUserById,
  getAllUser,
  deleteUser,
};

export default UserController;
