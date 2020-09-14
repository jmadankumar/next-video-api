import { Types, Schema, model } from 'mongoose';
import { IChannel } from '../types/model/channel-model';

const channelSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 20,
    },
    description: {
      type: String,
      required: true,
    },
    coverImageUrl: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    active: {
      type: Boolean,
      default: true,
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
    ownerId: {
      type: Types.ObjectId,
      required: true,
    },
  },
  { collection: 'channel' },
);

const ChannelModel = model<IChannel>('Channel', channelSchema);

export default ChannelModel;
