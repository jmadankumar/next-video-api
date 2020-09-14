import { Document } from 'mongoose';
import { IUser } from './user-model';

interface IChannelSchema extends Document {
  name: string;
  description: string;
  coverImageUrl?: string;
  imageUrl?: string;
  active?: boolean;
  createdBy: string;
  createdDate?: Date;
  updatedBy: string;
  updatedDate?: Date;
  deleted?: boolean;
  ownerId: string;
}

export interface IChannel extends IChannelSchema {
  getOwner(): IUser;
}
