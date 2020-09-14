import { UserDTO } from '../dto/user';

interface GetAllUserResponse {
  count: number;
  users: UserDTO[];
}

interface GetUserByIdResponse {
  user: UserDTO;
}
interface CreateUserResponse {
  message: string;
  user: UserDTO;
}
interface UpdateUserResponse {
  message: string;
  user: UserDTO;
}
interface DeleteUserResponse {
  message: string;
}
