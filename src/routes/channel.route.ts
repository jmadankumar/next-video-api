import { Router } from 'express';
import ChannelController from '../controllers/channel.controller';
import { wrapAsyncError } from '../helper/error';

const channelRouter = Router();

channelRouter.post('/', wrapAsyncError(ChannelController.createChannel));

channelRouter.put('/:id', wrapAsyncError(ChannelController.updateChannel));

channelRouter.delete('/:id', wrapAsyncError(ChannelController.deleteChannel));

channelRouter.get('/', wrapAsyncError(ChannelController.getAllChannel));

channelRouter.get('/:id', wrapAsyncError(ChannelController.getChannelById));

export default channelRouter;
