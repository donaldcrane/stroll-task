import { Schema, model } from 'mongoose';
import { IAssignedQuestion } from '../utils/interface';

const assignedQuestionSchema = new Schema(
  {
    question: { type: Schema.Types.ObjectId, ref: 'Question' },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true },
);
export default model<IAssignedQuestion>(
  'AssignedQuestion',
  assignedQuestionSchema,
);
