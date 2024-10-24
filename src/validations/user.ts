import Joi from "joi";

export const validateSignup = {
	body: Joi.object({
		name: Joi.string().min(2).max(20).required(),
		email: Joi.string().email().required(),
		password: Joi.string().required().min(6).max(16),
		region: Joi.string(),
	}).messages({
		"object.unknown": "You have used an invalid key.",
	}),
};
export const validateLogin = {
	body: Joi.object({
		email: Joi.string().email().required(),
		password: Joi.string().required().min(6).max(16),
	}).messages({
		"object.unknown": "You have used an invalid key.",
	}),
};
