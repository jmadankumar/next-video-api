import { Router } from 'express';
import LoggedUserController from '../controllers/logged-user.controller';

const loggedUserRouter = Router();

loggedUserRouter.get('/', LoggedUserController.getProfileDetail);

export default loggedUserRouter;
