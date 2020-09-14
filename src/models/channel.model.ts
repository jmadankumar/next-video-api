import mongoose from 'mongoose';

const { Schema, SchemaTypes } = mongoose;

const channelSchema = new Schema(
  {
    name: { type: SchemaTypes.String, required: true, maxlength: 20 },
    description: { type: SchemaTypes.String, required: true },
    coverImageUrl: { type: SchemaTypes.String },
    imageUrl: { type: SchemaTypes.String },
    active: { type: SchemaTypes.Boolean, default: true },
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
