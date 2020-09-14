import { VideoDTO } from '../dto/video';

export interface CreateVideoResponse {
  message: string;
  video: VideoDTO;
}

export interface UpdateVideoResponse {
  message: string;
  video: VideoDTO;
}

export interface GetVideoByIdResponse {
  video: VideoDTO;
}
export interface GetAllVideoResponse {
  videos: VideoDTO[];
  count: number;
}

export interface DeleteVideoResponse {
  message: string;
}
