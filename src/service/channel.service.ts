import { BadRequestError } from '../helper/error';
import ChannelModel from '../models/channel.model';
import { ChannelDTO } from '../types/channel';
import ChannelDTOUtil from '../util/channel.util';

const createChannel = async (channelDTO: ChannelDTO): Promise<ChannelDTO> => {
  if (channelDTO.id) {
    return updateChannel(channelDTO);
  }
  const channel = await ChannelModel.create({ ...channelDTO });

  if (!channel) {
    throw new BadRequestError('Unable to create channel');
  }
  return ChannelDTOUtil.fromIChannel(channel);
};

const updateChannel = async (channelDTO: ChannelDTO): Promise<ChannelDTO> => {
  if (!channelDTO.id) {
    throw new BadRequestError('Channel not found');
  }
  const channelInDB = await ChannelModel.findOneAndUpdate(
    { _id: channelDTO.id },
    { ...channelDTO },
  );
  if (!channelDTO) {
    throw new BadRequestError('Unable to update the Channel ');
  }
  return getChannelById(channelInDB.id);
};

const deleteChannel = async (channelDTO: ChannelDTO): Promise<void> => {
  const userInDB = await ChannelModel.findOneAndUpdate({ _id: channelDTO.id }, { deleted: true });
  if (!userInDB) {
    throw Error('Unable to delete channel');
  }
};

const getChannelById = async (id: string): Promise<ChannelDTO> => {
  const channelInDB = await ChannelModel.findById(id);
  if (!channelInDB) {
    throw new BadRequestError('Channel not found');
  }
  return ChannelDTOUtil.fromIChannel(channelInDB);
};

interface QueryOption {
  query?: string;
  page?: number;
  size?: number;
}
const getAllChannel = async (option: QueryOption): Promise<ChannelDTO[]> => {
  const { query = '', page = 1, size = 10 } = option;
  const channels = await ChannelModel.find({
    name: { $regex: query, $options: 'i' },
  })
    .skip((page - 1) * size)
    .limit(size);
  return channels.map((channel) => ChannelDTOUtil.fromIChannel(channel));
};

const getAllChannelCount = async (option: QueryOption): Promise<number> => {
  const count = await ChannelModel.count({});
  return count;
};

const ChannelService = {
  createChannel,
  updateChannel,
  deleteChannel,
  getChannelById,
  getAllChannel,
  getAllChannelCount,
};

export default ChannelService;
