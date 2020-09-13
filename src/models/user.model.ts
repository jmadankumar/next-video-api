import mongoose from 'mongoose';
import { Gender } from '../types/user';

const { Schema, Types } = mongoose;

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

interface IUserSchema extends mongoose.Document {
  email: string;
  password: string;
  name: string;
  authProvider: 'local' | 'google';
  gender: Gender;
  dob: Date;
  imageUrl: string;
  resetToken?: string;
  resetTokenDate?: Date;
  activationToken?: string;
  activationTokenDate?: Date;
  active?: boolean;
  createdDate?: Date;
  createdBy?: string;
  updatedDate?: Date;
  updatedBy?: string;
  deleted?: boolean;
}

UserSchema.methods.getGender = function () {
  if (this.gender === 0) {
    return 'Male';
  }
  return this.gender === 1 ? 'Female' : 'Others';
};
export interface IUser extends IUserSchema {
  getGender(): string;
}

const UserModel = mongoose.model<IUser>('User', UserSchema);

export default UserModel;
