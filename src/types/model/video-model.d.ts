import { Document } from 'mongoose';
import { IUser } from './user-model';

interface IVideoSchema extends Document {
  userId: string;
  channelId: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  tags: Array<string>;
  category: string;
  totalChunk: number;
  duration: number;
  mimeType: string;
  codec: string;
  supprtedQuality: Array<string>;
  isLive: boolean;
  liveStartDate: Date;
  liveEndDate: Date;
  createdBy: string;
  createdDate?: Date;
  updatedBy: string;
  updatedDate?: Date;
  deleted?: boolean;
}

export interface IVideo extends IVideoSchema {
  getUser(): IUser;
}
