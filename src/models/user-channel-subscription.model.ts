import mongoose from 'mongoose';

const { Schema, SchemaTypes } = mongoose;

const userChannelSubscriptionSchema = new Schema(
  {
    userId: { type: SchemaTypes.ObjectId, required: true },
    channelId: { type: SchemaTypes.ObjectId, required: true },
    createdDate: { type: SchemaTypes.Date, default: Date.now },
    createdBy: { type: SchemaTypes.ObjectId, required: true },
    updatedDate: { type: SchemaTypes.Date, default: Date.now },
    updatedBy: { type: SchemaTypes.ObjectId, required: true },
    deleted: { type: SchemaTypes.Boolean, default: false },
  },
  { collection: 'user_channel_subscription' },
);

const UserChannelSubscriptionModel = mongoose.model(
  'UserChannelSubscription',
  userChannelSubscriptionSchema,
);

export default UserChannelSubscriptionModel;
