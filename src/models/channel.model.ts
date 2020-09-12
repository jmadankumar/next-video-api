import mongoose from 'mongoose';

const { Schema, SchemaTypes } = mongoose;

const channelSchema = new Schema(
  {
    name: { type: SchemaTypes.String, required: true, maxlength: 20 },
    description: { type: SchemaTypes.String, required: true },
    coverImageUrl: { type: SchemaTypes.String, required: true },
    imageUrl: { type: SchemaTypes.String, required: true },
    active: { type: SchemaTypes.Boolean, required: true, default: true },
    createdDate: { type: SchemaTypes.Date, default: Date.now },
    createdBy: { type: SchemaTypes.ObjectId, required: true },
    updatedDate: { type: SchemaTypes.Date, default: Date.now },
    updatedBy: { type: SchemaTypes.ObjectId, required: true },
    deleted: { type: SchemaTypes.Boolean, default: false },
    ownerId: { type: SchemaTypes.ObjectId, required: true },
  },
  { collection: 'channel' },
);

const ChannelModel = mongoose.model('Channel', channelSchema);

export default ChannelModel;
