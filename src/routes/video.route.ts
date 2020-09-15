import { Router } from 'express';
import VideoController from '../controllers/video.controller';
import { wrapAsyncError } from '../helper/error';

const videoRouter = Router();

videoRouter.post('/', wrapAsyncError(VideoController.createVideo));

videoRouter.put('/:id', wrapAsyncError(VideoController.updateVideo));

videoRouter.delete('/:id', wrapAsyncError(VideoController.deleteVideo));

videoRouter.get('/', wrapAsyncError(VideoController.getAllVideo));

videoRouter.get('/:id', wrapAsyncError(VideoController.getVideoById));

export default videoRouter;
