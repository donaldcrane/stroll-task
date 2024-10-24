import mongoose from "mongoose";
import config from "../config/index";
import models from "../models";
import Question from "./question";
import Cycle from "./cycle";
import Region from "./region";
import User from "./user";
import Admin from "./admin";

const seedDatabase = async () => {
	console.log("seeding started...");
	await models.Question.insertMany(Question);
	await models.Cycle.insertMany(Cycle);
	await models.Region.insertMany(Region);
	await models.User.insertMany(User);
	await models.User.insertMany(Admin);
	console.log("seeding done...");
};

mongoose
	.connect(config.MONGO_URL, {})
	.then(async () => {
		console.log("MongoDB connected...");
		await seedDatabase();
		await mongoose.connection.close();
	})
	.catch((err) => {
		console.error("Connection error", err);
	});
