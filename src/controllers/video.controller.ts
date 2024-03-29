import { Request, Response } from 'express';
import VideoService from '../service/video.service';
import { VideoDTO } from '../types/video';

interface CreateVideoResponse {
  message: string;
  video: VideoDTO;
}

const createVideo = async (
  req: Request<null, null, VideoDTO>,
  res: Response<CreateVideoResponse>,
): Promise<void> => {
  const videoDTO = req.body;
  const video = await VideoService.createVideo(videoDTO);
  res.status(200).json({
    message: 'Video created',
    video,
  });
};

interface UpdateVideoResponse {
  message: string;
  video: VideoDTO;
}

const updateVideo = async (
  req: Request<null, null, VideoDTO>,
  res: Response<UpdateVideoResponse>,
): Promise<void> => {
  const videoDTO = req.body;
  const video = await VideoService.updateVideo(videoDTO);
  res.status(200).json({
    message: 'Video updated',
    video,
  });
};

interface GetVideoByIdResponse {
  video: VideoDTO;
}

const getVideoById = async (req: Request, res: Response<GetVideoByIdResponse>): Promise<void> => {
  const { id } = req.params;
  const video = await VideoService.getVideoById(id);
  res.status(200).json({ video });
};

interface GetAllVideoResponse {
  videos: VideoDTO[];
  count: number;
}

interface GetAllVideoQuery {
  query: string;
  offset: number;
  limit: number;
}
const getAllVideo = async (
  req: Request<any, any, any, GetAllVideoQuery>,
  res: Response<GetAllVideoResponse>,
): Promise<void> => {
  const { query, offset, limit } = req.query;
  const videos = await VideoService.getAllVideo({ offset, limit });
  const count = await VideoService.getAllVideoCount({ offset, limit });
  res.status(200).json({
    videos,
    count,
  });
};

interface DeleteVideoResponse {
  message: string;
}

const deleteVideo = async (
  req: Request<null, null, VideoDTO>,
  res: Response<DeleteVideoResponse>,
): Promise<void> => {
  const videoDTO = req.body;
  await VideoService.deleteVideo(videoDTO);
  res.status(200).json({ message: 'Video Deleted' });
};

const VideoController = {
  createVideo,
  updateVideo,
  deleteVideo,
  getVideoById,
  getAllVideo,
};

export default VideoController;
