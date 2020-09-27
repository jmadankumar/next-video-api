import { Response } from 'express';
import { wrapAsyncError } from '../helper/error';
import ChannelSubscriptionService from '../service/channel-subscription.service';
import ChannelService from '../service/channel.service';
import UserService from '../service/user.service';
import VideoService from '../service/video.service';
import { ChannelDTO } from '../types/channel';
import { UserDTO } from '../types/user';

interface GetMyDetailResponse {
  user: UserDTO;
  subscriptions: ChannelDTO[];
}
const getProfileDetail = async (req: Request, res: Response<GetMyDetailResponse>) => {
  const currentUser: UserDTO = res.locals.user;
  const user = await UserService.getUserById(currentUser.id);
  const subscriptions = await ChannelSubscriptionService.getAllChannelByUser({
    userId: currentUser.id,
  });
  res.status(200).json({ user, subscriptions });
};

interface GetMyChannelResponse {
  channel: ChannelDTO;
}

const getMyChannel = async (req: Request, res: Response<GetMyChannelResponse>) => {
  const currentUser: UserDTO = res.locals.user;
  const channel = await ChannelService.getChannelByOwner(currentUser.id);
  channel.subscribers = await ChannelSubscriptionService.getTotalSubscriberByChannel(channel.id);
  channel.videos = await VideoService.getAllVideo({ channelId: channel.id, offset: 0, limit: 30 });
  channel.totalVideo = await VideoService.getAllVideoCount({ channelId: channel.id });

  res.status(200).json({ channel });
};
const LoggedUserController = {
  getProfileDetail,
  getMyChannel,
};

export default LoggedUserController;
