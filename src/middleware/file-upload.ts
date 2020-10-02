import multer from 'multer';
import path from 'path';

const workingDir = process.cwd();

const fileUpload = multer({
  dest: path.resolve(workingDir, 'uploads'),
});

export default fileUpload;
