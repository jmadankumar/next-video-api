import { assert } from 'console';
import { Request, Response } from 'express';
import ChannelSubscriptionService from '../service/channel-subscription.service';
import { UserDTO } from '../types/user';

interface SubscribeRequestParam {
  id: string;
}
interface SubscribeResponse {
  message: string;
}
const subscribe = async (req: Request<SubscribeRequestParam>, res: Response<SubscribeResponse>) => {
  const user: UserDTO = res.locals.user;
  const channelId = req.params.id;

  await ChannelSubscriptionService.subscribe(channelId, user);

  res.status(200).json({ message: 'Channel Subscribed' });
};

interface GetAllSubscriberRequestParam {
  id: string;
}

interface GetAllSubscriberResponse {
  users: UserDTO[];
}

const getAllSubscriberByChannel = async (
  req: Request<GetAllSubscriberRequestParam>,
  res: Response<GetAllSubscriberResponse>,
) => {
  const { id } = req.params;
  const users = await ChannelSubscriptionService.getAllSubscriberByChannel({
    channelId: id as string,
  });
  res.status(200).json({
    users,
  });
};

const ChannelSubscriptionController = { subscribe, getAllSubscriberByChannel };

export default ChannelSubscriptionController;
