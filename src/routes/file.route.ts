import { Router } from 'express';
import FileController from '../controllers/file.controller';

const fileRouter = Router();

fileRouter.get('/content/:fileName', FileController.getFileContent);

export default fileRouter;
