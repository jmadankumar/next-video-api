import { BadRequestError } from '../helper/error';
import VideoModel from '../models/video.model';
import { VideoDTO } from '../types/video';
import VideoDTOUtil from '../util/video.util';

const createVideo = async (videoDTO: VideoDTO): Promise<VideoDTO> => {
  if (videoDTO.id) {
    return updateVideo(videoDTO);
  }
  const video = await VideoModel.create({ ...videoDTO });

  if (!video) {
    throw new BadRequestError('Unable to create video');
  }
  return VideoDTOUtil.fromIVideo(video);
};

const updateVideo = async (videoDTO: VideoDTO): Promise<VideoDTO> => {
  if (!videoDTO.id) {
    throw new BadRequestError('Video not found');
  }
  const videoInDB = await VideoModel.findOneAndUpdate({ _id: videoDTO.id }, { ...videoDTO });
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
  const videoInDB = await VideoModel.findById(id);
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
  const videos = await VideoModel.find({});
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
