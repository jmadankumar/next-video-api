import { Request, Response } from 'express';
import { wrapAsyncError } from '../helper/error';
import { saveFileContent } from '../helper/file';
import ChannelSubscriptionService from '../service/channel-subscription.service';
import ChannelService from '../service/channel.service';
import UserService from '../service/user.service';
import VideoService from '../service/video.service';
import { ChannelDTO } from '../types/channel';
import { UserDTO } from '../types/user';

interface GetMyDetailResponse {
  user: UserDTO;
}
const getProfileDetail = async (req: Request, res: Response<GetMyDetailResponse>) => {
  const currentUser: UserDTO = res.locals.user;
  const user = await UserService.getUserById(currentUser.id);
  const subscriptions = await ChannelSubscriptionService.getAllChannelByUser({
    userId: currentUser.id,
  });
  user.subscriptions = subscriptions;
  res.status(200).json({ user });
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

interface UpdateChannelRequest {
  name: string;
}

interface UpdateChannelResponse {
  message: string;
}
const updateChannel = async (
  req: Request<any, UpdateChannelResponse, UpdateChannelRequest>,
  res: Response,
) => {
  const currentUser: UserDTO = res.locals.user;
  const channelDetail = req.body;
  const channel = await ChannelService.getChannelByOwner(currentUser.id);
  const updatedchannel = await ChannelService.updateChannel({ id: channel.id, ...channelDetail });
  res.status(200).json({
    message: 'Channel updated',
  });
};

interface UploadProfileImageResponse {
  message: string;
}

const uploadImage = async (req: Request, res: Response<UploadProfileImageResponse>) => {
  const currentUser: UserDTO = res.locals.user;
  const channel = await ChannelService.getChannelByOwner(currentUser.id);
  const fileName = await saveFileContent(req.file);
  const updatedchannel = await ChannelService.updateChannel({ id: channel.id, imageUrl: fileName });
  res.status(200).json({
    message: 'Uploaded successfully',
  });
};

const uploadCoverImage = async (req: Request, res: Response) => {
  const currentUser: UserDTO = res.locals.user;
  const channel = await ChannelService.getChannelByOwner(currentUser.id);
  const fileName = await saveFileContent(req.file);
  const updatedchannel = await ChannelService.updateChannel({
    id: channel.id,
    coverImageUrl: fileName,
  });
  res.status(200).json({
    message: 'Uploaded successfully',
  });
};

const LoggedUserController = {
  getProfileDetail,
  getMyChannel,
  updateChannel,
  uploadImage,
  uploadCoverImage,
};

export default LoggedUserController;
