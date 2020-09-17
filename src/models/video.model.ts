import { Types, Schema, model, Document } from 'mongoose';
import { IChannel } from './channel.model';
import { IUser } from './user.model';

interface IVideoChunk {
  quality: string;
  sequenceNo: number;
  chunkUrl: string;
  contentLength: number;
}
interface IVideoSchema extends Document {
  userId: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  tags: Array<string>;
  category: string;
  totalChunk: number;
  chunkDetail: IVideoChunk[];
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

interface IVideoBase extends IVideoSchema {
  getUser(): IUser;
}
export interface IVideo extends IVideoBase {
  channel: IChannel['_id'];
}

export interface IVideoPopulated extends IVideoBase {
  channel: IChannel;
}

const videoChunkSchema = new Schema({
  quality: {
    type: String,
    required: true,
  },
  sequenceNo: {
    type: Number,
    required: true,
  },
  chunkUrl: {
    type: String,
    required: true,
  },
  contentLength: {
    type: Number,
    required: true,
  },
});

const videoSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      required: true,
    },
    channel: {
      type: Types.ObjectId,
      ref: 'Channel',
      required: true,
    },
    title: {
      type: String,
      required: true,
      maxlength: 50,
    },
    description: {
      type: String,
      required: true,
      maxlength: 10000,
    },
    thumbnailUrl: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    tags: {
      type: Array,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    totalChunk: {
      type: Number,
      required: true,
    },
    chunkDetail: [videoChunkSchema],
    duration: {
      type: Number,
      required: true,
    },
    mimeType: {
      type: String,
      required: true,
    },
    codec: {
      type: String,
      required: true,
    },
    supportedQuality: {
      type: Array,
      required: true,
    }, // list of quality 240, required: true }, 320, required: true }, 480, required: true }, 720, required: true }, 1080
    isLive: {
      type: Boolean,
      default: false,
    },
    liveStartDate: {
      type: Date,
    },
    liveEndDate: {
      type: Date,
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
  },
  { collection: 'channel_video' },
);

const VideoModel = model<IVideo>('Video', videoSchema);

export default VideoModel;
