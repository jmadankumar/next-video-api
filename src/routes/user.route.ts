import { Router } from 'express';
import UserController from '../controllers/user.controller';
import { wrapAsyncError } from '../helper/error';

const userRouter = Router();

userRouter.post('/', wrapAsyncError(UserController.createUser));

userRouter.put('/:id', wrapAsyncError(UserController.updateUser));

userRouter.delete('/:id', wrapAsyncError(UserController.deleteUser));

userRouter.get('/', wrapAsyncError(UserController.getAllUser));

userRouter.get('/:id', wrapAsyncError(UserController.getUserById));

export default userRouter;
