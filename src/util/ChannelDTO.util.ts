import { ChannelDTO } from '../types/dto/channel';
import { IChannel } from '../types/model/channel-model';

const fromIChannel = (channel: IChannel): ChannelDTO => {
  const {
    _id: id,
    name,
    description,
    coverImageUrl,
    imageUrl,
    createdBy,
    updatedBy,
    ownerId,
  } = channel;
  return { id, name, description, coverImageUrl, imageUrl, createdBy, updatedBy, ownerId };
};

const ChannelDTOUtil = {
  fromIChannel,
};

export default ChannelDTOUtil;
