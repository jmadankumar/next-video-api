import { model, Schema, Types, Document } from 'mongoose';
import { IChannel } from './channel.model';
import { IUser } from './user.model';

interface IChannelSubscriptionSchema extends Document {
  id: string;
  createdDate?: Date;
  createdBy: string;
  updatedDate?: Date;
  updatedBy: string;
  deleted: boolean;
}
interface IChannelSubscriptionBase extends IChannelSubscriptionSchema {}
export interface IChannelSubscription extends IChannelSubscriptionBase {
  channel: IChannel['_id'];
  user: IUser['_id'];
}

export interface IChannelSubscriptionPopulated extends IChannelSubscriptionBase {
  channel: IChannel;
  user: IUser;
}

const ChannelSubscriptionSchema = new Schema(
  {
    channel: {
      type: Types.ObjectId,
      required: true,
      ref: 'Channel',
    },
    user: {
      type: Types.ObjectId,
      required: true,
      ref: 'User',
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
  { collection: 'channel_subscription' },
);

const ChannelSubscriptionModel = model<IChannelSubscription>(
  'ChannelSubscription',
  ChannelSubscriptionSchema,
);

export default ChannelSubscriptionModel;
