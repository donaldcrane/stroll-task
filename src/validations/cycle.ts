import Joi from "joi";
import objectId from "./common";

export const validateCycle = {
	body: Joi.object({
		name: Joi.string().min(2).max(3000).required(),
		duration: Joi.number().required(),
		startDate: Joi.date().required(),
		endDate: Joi.date().required(),
	}).messages({
		"object.unknown": "You have used an invalid key.",
	}),
};

export const validateId = {
	params: Joi.object({
		id: objectId.messages({
			"any.required": "comment is required.",
			"string.length": "comment id must be a valid mongoose id.",
		}),
	}).messages({
		"object.unknown": "You have used an invalid key.",
	}),
};
