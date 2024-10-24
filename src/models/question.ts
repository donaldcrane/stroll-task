import { Schema, model } from 'mongoose';
import { IQuestion } from '../utils/interface';

const questionSchema = new Schema(
  {
    question: { type: String },
    region: { type: Schema.Types.ObjectId, ref: 'Region' },
    cycle: { type: Schema.Types.ObjectId, ref: 'Cycle' },
    status: {
      type: String,
      enum: ['assigned', 'unassigned'],
      default: 'unassigned',
    },
  },
  { timestamps: true },
);
export default model<IQuestion>('Question', questionSchema);
