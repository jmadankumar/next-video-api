import { Request, Response } from 'express';
import { readFileContent, readFileStream } from '../helper/file';

interface GetFileContentParams {
  fileName: string;
}
const getFileContent = async (req: Request<GetFileContentParams>, res: Response) => {
  const fileName = req.params.fileName;

  res.status(200).send(await readFileContent(fileName));
};

const FileController = {
  getFileContent,
};

export default FileController;
