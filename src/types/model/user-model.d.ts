import { Document } from 'mongoose';
import { Gender } from '../../enum';

interface IUserSchema extends Document {
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

export interface IUser extends IUserSchema {
    getGender(): string;
  }
  