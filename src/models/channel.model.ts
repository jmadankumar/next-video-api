import { Types, Schema, model, Document } from 'mongoose';
import { IUser } from './user.model';

interface IChannelSchema extends Document {
  name: string;
  description?: string;
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
  getProfileImage: () => string;
  getCoverImage: () => string;
}

const channelSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 20,
    },
    description: {
      type: String,
    },
    coverImageUrl: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    active: {
      type: Boolean,
      default: true,
    },
    createdDate: {
      type: Date,
      default: Date.now,
    },
    createdBy: {
      type: Types.ObjectId,
      required: true,
    },
    updatedDate: {
      type: Date,
      default: Date.now,
    },
    updatedBy: {
      type: Types.ObjectId,
      required: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    ownerId: {
      type: Types.ObjectId,
      required: true,
    },
  },
  { collection: 'channel' },
);

channelSchema.methods.getProfileImage = function () {
  return process.env.FILE_CONTENT_PATH + this.imageUrl;
};

channelSchema.methods.getCoverImage = function () {
  return process.env.FILE_CONTENT_PATH + this.coverImageUrl;
};

const ChannelModel = model<IChannel>('Channel', channelSchema);

export default ChannelModel;
