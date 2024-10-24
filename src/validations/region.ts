import Joi from "joi";

const validateRegion = {
	body: Joi.object({
		name: Joi.string().required(),
	}).messages({
		"object.unknown": "You have used an invalid key.",
	}),
};

export default validateRegion;
