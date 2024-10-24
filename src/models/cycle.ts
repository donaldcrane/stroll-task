import { Schema, model } from "mongoose";
import { ICycle } from "../utils/interface";

const cycleSchema = new Schema(
	{
		name: { type: String },
		duration: { type: Number, default: 7 },
		startDate: { type: Date },
		endDate: { type: Date },
		status: { type: String, enum: ["active", "expired", "pending"], default: "pending" },
	},
	{ timestamps: true }
);

export default model<ICycle>("Cycle", cycleSchema);
