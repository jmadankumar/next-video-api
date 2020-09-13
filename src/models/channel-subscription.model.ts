import mongoose from 'mongoose';

const { Schema, SchemaTypes } = mongoose;

const ChannelSubscriptionSchema = new Schema(
  {
    Id: { type: SchemaTypes.ObjectId, required: true },
    channelId: { type: SchemaTypes.ObjectId, required: true },
    createdDate: { type: SchemaTypes.Date, default: Date.now },
    createdBy: { type: SchemaTypes.ObjectId, required: true },
    updatedDate: { type: SchemaTypes.Date, default: Date.now },
    updatedBy: { type: SchemaTypes.ObjectId, required: true },
    deleted: { type: SchemaTypes.Boolean, default: false },
  },
  { collection: 'channel_subscription' },
);

const ChannelSubscriptionModel = mongoose.model(
  'ChannelSubscription',
  ChannelSubscriptionSchema,
);

export default ChannelSubscriptionModel;
