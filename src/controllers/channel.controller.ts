import { Request, Response } from 'express';
import ChannelService from '../service/channel.service';
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
  res.status(200).json({ channel });
};

interface GetAllChannelResponse {
  channels: ChannelDTO[];
  count: number;
}

export const getAllChannel = async (
  req: Request,
  res: Response<GetAllChannelResponse>,
): Promise<void> => {
  const channels = await ChannelService.getAllChannel({ page: 0, size: 20 });
  const count = await ChannelService.getAllChannelCount({ page: 0, size: 20 });
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
