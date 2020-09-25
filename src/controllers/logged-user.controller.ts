import { Response } from 'express';
import { wrapAsyncError } from '../helper/error';
import UserService from '../service/user.service';
import { UserDTO } from '../types/user';

interface GetMyDetailResponse {
  user: UserDTO;
}
const getProfileDetail = wrapAsyncError(async (req: Request, res: Response<GetMyDetailResponse>) => {
  const currentUser: UserDTO = res.locals.user;
  const user = await UserService.getUserById(currentUser.id);
  res.status(200).json({ user });
});

const LoggedUserController = {
  getProfileDetail
};

export default LoggedUserController;
