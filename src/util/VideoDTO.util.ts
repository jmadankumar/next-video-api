import { VideoDTO } from '../types/dto/video';
import { IVideo } from '../types/model/video-model';

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
  };
};

const VideoDTOUtil = {
  fromIVideo,
};

export default VideoDTOUtil;
