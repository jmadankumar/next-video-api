import { VideoDTO } from '../types/video';
import { IVideoPopulated } from '../models/video.model';
import ChannelDTOUtil from './channel.util';

const fromIVideo = (video: IVideoPopulated): VideoDTO => {
  const {
    _id: id,
    userId,
    channel,
    title,
    description,
    thumbnailUrl,
    videoUrl,
    tags,
    category,
    totalChunk,
    duration,
    mimeType,
    codec,
    supprtedQuality,
    isLive,
    liveStartDate,
    liveEndDate,
    createdBy,
    createdDate,
    updatedBy,
    updatedDate,
    deleted,
    chunkDetail,
  } = video;
  return {
    id,
    userId,
    channel: ChannelDTOUtil.fromIChannel(channel),
    title,
    description,
    thumbnailUrl,
    videoUrl,
    tags,
    category,
    totalChunk,
    duration,
    mimeType,
    codec,
    supprtedQuality,
    isLive,
    liveStartDate,
    liveEndDate,
    createdBy,
    createdDate,
    updatedBy,
    updatedDate,
    deleted,
    chunkDetail,
  };
};

const VideoDTOUtil = {
  fromIVideo,
};

export default VideoDTOUtil;
