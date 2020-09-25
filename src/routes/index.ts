import { Router } from 'express';
import authRouter from './auth.route';
// import channelSubscriptionRouter from './channel-subscription.route';
import videoRouter from './video.route';
import channelRouter from './channel.route';
import userRouter from './user.route';
import loggedUserRouter from './logged-user.route';
import { authorizeUser } from '../middleware/auth.middleware';
// import watchHistoryRouter from './watch-history.route';

const apiRouter = Router();

apiRouter.use('/auth', authRouter);

// apiRouter.use('/channel-subscription', channelSubscriptionRouter);

apiRouter.use('/channel', channelRouter);

apiRouter.use('/video', videoRouter);

apiRouter.use('/user', userRouter);

// apiRouter.use('/watch-history', watchHistoryRouter);

apiRouter.use('/me', authorizeUser, loggedUserRouter);

export default apiRouter;
