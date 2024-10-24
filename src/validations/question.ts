import Joi from "joi";

const validateQuestion = {
	body: Joi.object({
		question: Joi.string().required(),
		region: Joi.string().required(),
		cycle: Joi.string().required(),
	}).messages({
		"object.unknown": "You have used an invalid key.",
	}),
};

export default validateQuestion;
