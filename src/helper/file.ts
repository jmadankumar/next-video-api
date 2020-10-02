import { v4 as uuid } from 'uuid';
import path from 'path';
import { readFile, writeFile, copyFile, mkdir, access, read } from 'fs/promises';
import { constants, ReadStream } from 'fs';
import { BadRequestError } from './error';
import { fstat, createReadStream } from 'fs';

const workingDir = process.cwd();

const fileStoragePath = path.resolve(workingDir, 'file-storage');

const getFileExtension = (fileName: string) => {
  return fileName.substring(fileName.lastIndexOf('.') + 1);
};

const createDirIfNotExits = async (path: string): Promise<void> => {
  try {
    await access(path, constants.W_OK);
  } catch (error) {
    await mkdir(path);
  }
};

export const saveFileContent = async (file: Express.Multer.File): Promise<string> => {
  const fileName = uuid();
  const extension = getFileExtension(file.originalname);
  const fileNameWithExt = `${fileName}.${extension}`;

  const filePath = path.join(fileStoragePath, fileNameWithExt);
  try {
    await createDirIfNotExits(fileStoragePath);
    await copyFile(file.path, filePath);
  } catch (error) {
    throw new BadRequestError('Failed to write file');
  }

  return fileNameWithExt;
};

export const readFileContent = async (fileName: string) => {
  const filePath = path.join(fileStoragePath, fileName);
  return await readFile(filePath);
};

export const readFileStream = (fileName: string): ReadStream => {
  const filePath = path.join(fileStoragePath, fileName);
  return createReadStream(filePath);
};
