import mongoose from 'mongoose';
import { Gender } from '../enum';
import { IUser } from '../types/model/user-model';

const { Schema, Types } = mongoose;

// Reference:https://medium.com/@agentwhs/complete-guide-for-typescript-for-mongoose-for-node-js-8cc0a7e470c1

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    authProvider: {
      type: String,
      required: true,
      default: 'local',
    }, // local / google
    gender: {
      type: Number,
      enum: [0, 1, 2],
      default: 0,
      required: true,
    },
    dob: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    resetToken: {
      type: String,
      required: false,
    },
    resetTokenDate: {
      type: Date,
      required: false,
    },
    activationToken: {
      type: String,
      required: false,
    },
    activationTokenDate: {
      type: Date,
      required: false,
    },
    active: {
      type: Boolean,
      default: false,
    },
    createdDate: {
      type: Date,
      default: Date.now,
    },
    createdBy: {
      type: Types.ObjectId,
      required: false,
    },
    updatedDate: {
      type: Date,
      default: Date.now,
    },
    updatedBy: {
      type: Types.ObjectId,
      required: false,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { collection: 'user' },
);

UserSchema.methods.getGender = function () {
  return Gender[this.gender];
};

const UserModel = mongoose.model<IUser>('User', UserSchema);

export default UserModel;
