import { Response } from 'express';
import { wrapAsyncError } from '../helper/error';
import ChannelSubscriptionService from '../service/channel-subscription.service';
import UserService from '../service/user.service';
import { ChannelDTO } from '../types/channel';
import { UserDTO } from '../types/user';

interface GetMyDetailResponse {
  user: UserDTO;
  subscriptions: ChannelDTO[];
}
const getProfileDetail = wrapAsyncError(
  async (req: Request, res: Response<GetMyDetailResponse>) => {
    const currentUser: UserDTO = res.locals.user;
    const user = await UserService.getUserById(currentUser.id);
    const subscriptions = await ChannelSubscriptionService.getAllChannelByUser({
      userId: currentUser.id,
    });
    res.status(200).json({ user, subscriptions });
  },
);

const LoggedUserController = {
  getProfileDetail,
};

export default LoggedUserController;
