import dotenv from "dotenv";
import { IAssignedQuestion, IUser, QueueData, mqQueuesEnum } from "../utils/interface";
import models from "../models";

dotenv.config();
const assignQuestion = async (data: QueueData) => {
	const result = [] as IAssignedQuestion[];

	data.users.map(async (user: IUser) => {
		result.push({
			user: user._id ? user._id : "",
			question: data.question ? data.question : "",
		});
	});

	return models.AssignedQuestion.insertMany(result);
};

export default assignQuestion;
