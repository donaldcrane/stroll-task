import { DateTime } from "luxon";
import { Request, Response, NextFunction } from "express";
import models from "../models";

const getCurrentCycle = async () => {
	const cycle = await models.Cycle.findOne({}).sort({ createdAt: -1 }).exec();
	if (cycle) {
		await models.Cycle.findByIdAndUpdate(cycle._id, { status: "expired" }, { new: true });
	}
};

export default getCurrentCycle;
