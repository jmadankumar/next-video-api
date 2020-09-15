import { VideoDTO } from '../types/video';
import { IVideo } from '../models/video.model';

const fromIVideo = (video: IVideo): VideoDTO => {
  const {
    _id: id,
    userId,
    channelId,
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
    channelId,
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
