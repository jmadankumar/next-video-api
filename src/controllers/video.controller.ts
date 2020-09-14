import { Request, Response } from 'express';
import VideoService from '../service/video.service';
import {
  CreateVideoResponse,
  DeleteVideoResponse,
  GetAllVideoResponse,
  GetVideoByIdResponse,
  UpdateVideoResponse,
} from '../types/api/video-api';
import { VideoDTO } from '../types/dto/video';

export const createVideo = async (
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

export const updateVideo = async (
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

export const getVideoById = async (
  req: Request,
  res: Response<GetVideoByIdResponse>,
): Promise<void> => {
  const { id } = req.params;
  const video = await VideoService.getVideoById(id);
  res.status(200).json({ video });
};

export const getAllVideo = async (
  req: Request,
  res: Response<GetAllVideoResponse>,
): Promise<void> => {
  const videos = await VideoService.getAllVideo({ page: 0, size: 20 });
  const count = await VideoService.getAllVideoCount({ page: 0, size: 20 });
  res.status(200).json({
    videos,
    count,
  });
};

export const deleteVideo = async (
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
