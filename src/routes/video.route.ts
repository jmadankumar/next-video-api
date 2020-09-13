import { Router } from 'express';
import {
  getAllVideo,
  getVideoById,
  createVideo,
  updateVideo,
  deleteVideo,
  uploadVideo,
} from '../controllers/video.controller';

const videoRouter = Router();

videoRouter.get('/', getAllVideo);

videoRouter.get('/:id', getVideoById);

videoRouter.post('/', createVideo);

videoRouter.put('/:id', updateVideo);

videoRouter.put('/upload', uploadVideo);

videoRouter.delete('/:id', deleteVideo);

export default videoRouter;
