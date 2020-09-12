import mongoose from 'mongoose';

const { Schema, SchemaTypes } = mongoose;

const videoChunkSchema = new Schema(
  {
    videoId: { type: SchemaTypes.ObjectId, required: true },
    quality: { type: SchemaTypes.String, required: true },
    sequenceNo: { type: SchemaTypes.Number, required: true },
    chunkUrl: { type: SchemaTypes.String, required: true },
    createdDate: { type: SchemaTypes.Date, default: Date.now },
    createdBy: { type: SchemaTypes.ObjectId, required: true },
    updatedDate: { type: SchemaTypes.Date, default: Date.now },
    updatedBy: { type: SchemaTypes.ObjectId, required: true },
    deleted: { type: SchemaTypes.Boolean, default: false },
    contentLength: { type: SchemaTypes.Number, required: true },
  },
  { collection: 'video_chunk' },
);

const VideoChunkModel = mongoose.model('VideoChunk', videoChunkSchema);

export default VideoChunkModel;
