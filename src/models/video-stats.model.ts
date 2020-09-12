import mongoose from 'mongoose';

const { Schema, SchemaTypes } = mongoose;

const videoStatsSchema = new Schema(
  {
    userId: { type: SchemaTypes.ObjectId, required: true },
    type: { type: SchemaTypes.String, required: true }, // like, dislike, share
    videoId: { type: SchemaTypes.ObjectId, required: true },
    createdDate: { type: SchemaTypes.Date, default: Date.now },
    createdBy: { type: SchemaTypes.ObjectId, required: true },
    updatedDate: { type: SchemaTypes.Date, default: Date.now },
    updatedBy: { type: SchemaTypes.ObjectId, required: true },
    deleted: { type: SchemaTypes.Boolean, default: false },
  },
  {
    collection: 'video_stats',
  },
);

const VideoStatsModel = mongoose.model('VideoStats', videoStatsSchema);

export default VideoStatsModel;
