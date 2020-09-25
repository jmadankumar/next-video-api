import { BadRequestError } from '../helper/error';
import VideoModel, { IVideoPopulated } from '../models/video.model';
import { VideoDTO } from '../types/video';
import VideoDTOUtil from '../util/video.util';

const createVideo = async (videoDTO: VideoDTO): Promise<VideoDTO> => {
  if (videoDTO.id) {
    return updateVideo(videoDTO);
  }
  const video = await VideoModel.create({ ...videoDTO, channel: videoDTO.channel.id });

  if (!video) {
    throw new BadRequestError('Unable to create video');
  }
  return getVideoById(video.id);
};

const updateVideo = async (videoDTO: VideoDTO): Promise<VideoDTO> => {
  if (!videoDTO.id) {
    throw new BadRequestError('Video not found');
  }
  const videoInDB = await VideoModel.findOneAndUpdate(
    { _id: videoDTO.id },
    { ...videoDTO, channel: videoDTO.channel.id },
  );
  if (!videoDTO) {
    throw new BadRequestError('Unable to update the Video ');
  }
  return getVideoById(videoInDB.id);
};

const deleteVideo = async (videoDTO: VideoDTO): Promise<void> => {
  const userInDB = await VideoModel.findOneAndUpdate({ _id: videoDTO.id }, { deleted: true });
  if (!userInDB) {
    throw Error('Unable to delete video');
  }
};

const getVideoById = async (id: string): Promise<VideoDTO> => {
  const videoInDB = (await VideoModel.findById(id)
    .populate('channel')
    .exec()
    .then((video: any) => {
      return video;
    })) as IVideoPopulated;
  if (!videoInDB) {
    throw new BadRequestError('Video not found');
  }
  return VideoDTOUtil.fromIVideo(videoInDB);
};

interface QueryOption {
  page: number;
  size: number;
}
const getAllVideo = async (option: QueryOption): Promise<VideoDTO[]> => {
  const videos = (await VideoModel.find({})
    .populate('channel')
    .exec()
    .then((videos: any) => {
      return videos;
    })) as IVideoPopulated[];
  return videos.map((video) => VideoDTOUtil.fromIVideo(video));
};

const getAllVideoCount = async (option: QueryOption): Promise<number> => {
  const count = await VideoModel.count({});
  return count;
};

const VideoService = {
  createVideo,
  updateVideo,
  deleteVideo,
  getVideoById,
  getAllVideo,
  getAllVideoCount,
};

export default VideoService;
