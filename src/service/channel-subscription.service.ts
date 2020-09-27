import { BadRequestError } from '../helper/error';
import ChannelSubscriptionModel, {
  IChannelSubscriptionPopulated,
} from '../models/channel-subscription.model';
import { ChannelDTO, ChannelSubcriptionDTO } from '../types/channel';
import { UserDTO } from '../types/user';
import ChannelDTOUtil from '../util/channel.util';
import UserDTOUtil from '../util/user.util';
import ChannelService from './channel.service';

const subscribe = async (channelId: string, user: UserDTO): Promise<ChannelSubcriptionDTO> => {
  const channel = await ChannelService.getChannelById(channelId);

  if (!channel) {
    throw new BadRequestError('Channel Not Found');
  }

  const channelSubscription = await ChannelSubscriptionModel.findOne({
    channel: channelId,
    user: user.id,
  });

  if (channelSubscription) {
    throw new BadRequestError('Already subscribed');
  }

  const newChannelSubscription = await ChannelSubscriptionModel.create({
    channel: channelId,
    user: user.id,
    createdBy: user.id,
    updatedBy: user.id,
    deleted: false,
  });

  if (!newChannelSubscription) {
    throw new BadRequestError('Unable to subscribe. Please try again');
  }

  return newChannelSubscription as ChannelSubcriptionDTO;
};

interface GetAllSubscriberOption {
  channelId: string;
  offset?: number;
  limit?: number;
}

const getAllSubscriberByChannel = async (option: GetAllSubscriberOption): Promise<UserDTO[]> => {
  const { channelId } = option;
  const channelSubscriptions = (await ChannelSubscriptionModel.find({ channel: channelId })
    .populate('user')
    .then((results) => results)) as IChannelSubscriptionPopulated[];
  return channelSubscriptions.map((channelSubscription) =>
    UserDTOUtil.fromIUser(channelSubscription.user),
  );
};

interface GetAllChannelByUserOption {
  userId: string;
}
const getAllChannelByUser = async (option: GetAllChannelByUserOption): Promise<ChannelDTO[]> => {
  const { userId } = option;
  const channelSubscriptions = (await ChannelSubscriptionModel.find({ user: userId })
    .populate('channel')
    .then((results) => results)) as IChannelSubscriptionPopulated[];
  console.log(channelSubscriptions);
  return channelSubscriptions.map((channelSubscription) =>
    ChannelDTOUtil.fromIChannel(channelSubscription.channel),
  );
};

const getTotalSubscriberByChannel = async (channelId: string): Promise<number> => {
  return await ChannelSubscriptionModel.count({ channel: channelId });
};

const ChannelSubscriptionService = {
  subscribe,
  getAllSubscriberByChannel,
  getAllChannelByUser,
  getTotalSubscriberByChannel,
};

export default ChannelSubscriptionService;
