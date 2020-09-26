import { Router } from 'express';
import ChannelSubscriptionController from '../controllers/channel-subscription.controller';
import ChannelController from '../controllers/channel.controller';
import { wrapAsyncError } from '../helper/error';
import { authorizeUser } from '../middleware/auth.middleware';
import { parsePaginationQuery } from '../middleware/pagination';

const channelRouter = Router();

channelRouter.post('/', wrapAsyncError(ChannelController.createChannel));

channelRouter.put('/:id', wrapAsyncError(ChannelController.updateChannel));

channelRouter.delete('/:id', wrapAsyncError(ChannelController.deleteChannel));

channelRouter.get('/', parsePaginationQuery, wrapAsyncError(ChannelController.getAllChannel));

channelRouter.get('/:id', wrapAsyncError(ChannelController.getChannelById));

channelRouter.post(
  '/:id/subscribe',
  authorizeUser,
  wrapAsyncError(ChannelSubscriptionController.subscribe),
);

channelRouter.get(
  '/:id/subscribers',
  authorizeUser,
  wrapAsyncError(ChannelSubscriptionController.getAllSubscriberByChannel),
);

export default channelRouter;
