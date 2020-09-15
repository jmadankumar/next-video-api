import { Types, Schema, model } from 'mongoose';
import { IVideo } from '../types/model/video-model';

const videoSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      required: true,
    },
    channelId: {
      type: Types.ObjectId,
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
