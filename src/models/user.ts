import { Schema, model } from 'mongoose';
import { IUser } from '../utils/interface';

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: { type: String },
    name: { type: String },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    region: { type: Schema.Types.ObjectId, ref: 'Region' },
  },
  { timestamps: true },
);

userSchema.index({ name: 'text' });

export default model<IUser>('User', userSchema);
