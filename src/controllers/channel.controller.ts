import { Request, Response } from 'express';
import ChannelSubscriptionService from '../service/channel-subscription.service';
import ChannelService from '../service/channel.service';
import VideoService from '../service/video.service';
import { ChannelDTO } from '../types/channel';

interface CreateChannelResponse {
  message: string;
  channel: ChannelDTO;
}

export const createChannel = async (
  req: Request<null, null, ChannelDTO>,
  res: Response<CreateChannelResponse>,
): Promise<void> => {
  const channelDTO = req.body;
  const channel = await ChannelService.createChannel(channelDTO);
  res.status(200).json({
    message: 'Channel created',
    channel,
  });
};

interface UpdateChannelResponse {
  message: string;
  channel: ChannelDTO;
}

export const updateChannel = async (
  req: Request<null, null, ChannelDTO>,
  res: Response<UpdateChannelResponse>,
): Promise<void> => {
  const channelDTO = req.body;
  const channel = await ChannelService.updateChannel(channelDTO);
  res.status(200).json({
    message: 'Channel updated',
    channel,
  });
};

interface GetChannelByIdResponse {
  channel: ChannelDTO;
}

export const getChannelById = async (
  req: Request,
  res: Response<GetChannelByIdResponse>,
): Promise<void> => {
  const { id } = req.params;
  const channel = await ChannelService.getChannelById(id);
  channel.subscribers = await ChannelSubscriptionService.getTotalSubscriberByChannel(channel.id);
  channel.videos = await VideoService.getAllVideo({ channelId: channel.id, offset: 0, limit: 30 });
  channel.totalVideo = await VideoService.getAllVideoCount({ channelId: channel.id });

  res.status(200).json({ channel });
};

interface GetAllChannelResponse {
  channels: ChannelDTO[];
  count: number;
}

interface GetAllChannelQuery {
  query?: string;
  offset?: number;
  limit?: number;
}
export const getAllChannel = async (
  req: Request<any, any, any, GetAllChannelQuery>,
  res: Response<GetAllChannelResponse>,
): Promise<void> => {
  const { query, offset, limit } = req.query;
  const channels = await ChannelService.getAllChannel({ query, offset, limit });
  const count = await ChannelService.getAllChannelCount({ query, offset, limit });
  res.status(200).json({
    channels,
    count,
  });
};

interface DeleteChannelResponse {
  message: string;
}

export const deleteChannel = async (
  req: Request<null, null, ChannelDTO>,
  res: Response<DeleteChannelResponse>,
): Promise<void> => {
  const channelDTO = req.body;
  await ChannelService.deleteChannel(channelDTO);
  res.status(200).json({ message: 'Channel Deleted' });
};

const ChannelController = {
  createChannel,
  updateChannel,
  deleteChannel,
  getChannelById,
  getAllChannel,
};

export default ChannelController;
