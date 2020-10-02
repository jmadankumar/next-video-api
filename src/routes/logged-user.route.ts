import { Router } from 'express';
import LoggedUserController from '../controllers/logged-user.controller';
import { wrapAsyncError } from '../helper/error';
import fileUpload from '../middleware/file-upload';

const loggedUserRouter = Router();

loggedUserRouter.get('/', wrapAsyncError(LoggedUserController.getProfileDetail));

loggedUserRouter.get('/channel', wrapAsyncError(LoggedUserController.getMyChannel));

loggedUserRouter.put('/channel', wrapAsyncError(LoggedUserController.updateChannel));

loggedUserRouter.put(
  '/channel/upload-profile-image',
  fileUpload.single('file'),
  wrapAsyncError(LoggedUserController.uploadImage),
);

loggedUserRouter.put(
  '/channel/upload-cover-image',
  fileUpload.single('file'),
  wrapAsyncError(LoggedUserController.uploadCoverImage),
);

export default loggedUserRouter;
