import { Types, model, Schema } from 'mongoose';
import IVideoChunk from '../types/model/video-chuck-model';

const videoChunkSchema = new Schema(
  {
    videoId: {
      type: Types.ObjectId,
      required: true,
    },
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
  { collection: 'video_chunk' },
);

const VideoChunkModel = model<IVideoChunk>('VideoChunk', videoChunkSchema);

export default VideoChunkModel;
