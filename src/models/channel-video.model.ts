import mongoose from 'mongoose';

const { Schema, SchemaTypes } = mongoose;

const channelVideoSchema = new Schema(
  {
    userId: { type: SchemaTypes.ObjectId, required: true },
    channelId: { type: SchemaTypes.ObjectId, required: true },
    title: { type: SchemaTypes.String, required: true, maxlength: 50 },
    description: { type: SchemaTypes.String, required: true, maxlength: 10000 },
    thumbnailUrl: { type: SchemaTypes.String, required: true },
    videoUrl: { type: SchemaTypes.String, required: true },
    tags: { type: SchemaTypes.Array, required: true },
    category: { type: SchemaTypes.String, required: true },
    totalChunk: { type: SchemaTypes.Number, required: true },
    duration: { type: SchemaTypes.Number, required: true },
    mimeType: { type: SchemaTypes.String, required: true },
    codec: { type: SchemaTypes.String, required: true },
    supprtedQuality: { type: SchemaTypes.Array, required: true }, // list of quality 240, required: true }, 320, required: true }, 480, required: true }, 720, required: true }, 1080
    isLive: { type: SchemaTypes.Boolean, default: false },
    liveStartDate: { type: SchemaTypes.Date },
    liveEndDate: { type: SchemaTypes.Date },
    createdDate: { type: SchemaTypes.Date, default: Date.now },
    createdBy: { type: SchemaTypes.ObjectId, required: true },
    updatedDate: { type: SchemaTypes.Date, default: Date.now },
    updatedBy: { type: SchemaTypes.ObjectId, required: true },
    deleted: { type: SchemaTypes.Boolean, default: false },
  },
  { collection: 'channel_video' },
);

const ChannelVideoModel = mongoose.model('ChannelVideo', channelVideoSchema);

export default ChannelVideoModel;
