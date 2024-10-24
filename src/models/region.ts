import { Schema, model } from 'mongoose';
import { IRegion } from '../utils/interface';

const regionSchema = new Schema(
  {
    name: { type: String },
  },
  { timestamps: true },
);

export default model<IRegion>('Region', regionSchema);
