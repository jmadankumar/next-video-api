import mongoose from 'mongoose';

const { Schema, SchemaTypes } = mongoose;

const watchHistorySchema = new Schema(
  {
    userId: { type: SchemaTypes.ObjectId, required: true },
    videoId: { type: SchemaTypes.ObjectId, required: true },
    startDate: { type: SchemaTypes.Date, required: true },
    endDate: { type: SchemaTypes.Date, required: true },
    watchedDuration: { type: SchemaTypes.Number, required: true },
    createdDate: { type: SchemaTypes.Date, default: Date.now },
    createdBy: { type: SchemaTypes.ObjectId, required: true },
    updatedDate: { type: SchemaTypes.Date, default: Date.now },
    updatedBy: { type: SchemaTypes.ObjectId, required: true },
    deleted: { type: SchemaTypes.Boolean, default: false },
  },
  {
    collection: 'watch_history',
  },
);

const WatchHistoryModel = mongoose.model('WatchHistory', watchHistorySchema);

export default WatchHistoryModel;
