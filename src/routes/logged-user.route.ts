import { Router } from 'express';
import LoggedUserController from '../controllers/logged-user.controller';
import { wrapAsyncError } from '../helper/error';

const loggedUserRouter = Router();

loggedUserRouter.get('/', wrapAsyncError(LoggedUserController.getProfileDetail));

loggedUserRouter.get('/channel', wrapAsyncError(LoggedUserController.getMyChannel));

export default loggedUserRouter;
