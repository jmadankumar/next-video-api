import mongoose from 'mongoose';

const { Schema, SchemaTypes } = mongoose;

const userSchema = new Schema(
  {
    email: { type: SchemaTypes.String, required: true },
    password: { type: SchemaTypes.String, required: true },
    name: { type: SchemaTypes.String, required: true },
    authProvider: { type: SchemaTypes.String, required: true, default: 'local' }, // local / google
    gender: { type: SchemaTypes.String, required: true },
    dob: { type: SchemaTypes.String, required: true },
    imageUrl: { type: SchemaTypes.String, required: true },
    resetToken: { type: SchemaTypes.String, required: false },
    resetTokenDate: { type: SchemaTypes.Date, required: false },
    activationToken: { type: SchemaTypes.String, required: false },
    activationTokenDate: { type: SchemaTypes.Date, required: false },
    active: { type: SchemaTypes.Boolean, required: true, default: true },
    createdDate: { type: SchemaTypes.Date, default: Date.now },
    createdBy: { type: SchemaTypes.ObjectId, required: true },
    updatedDate: { type: SchemaTypes.Date, default: Date.now },
    updatedBy: { type: SchemaTypes.ObjectId, required: true },
    deleted: { type: SchemaTypes.Boolean, default: false },
  },
  { collection: 'user' },
);

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
