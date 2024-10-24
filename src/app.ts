import express from "express";
import cors from "cors";
import router from "./routes/index";
import config from "./config";
import db from "./config/database";
import reqLogger from "./utils/reqLogger";
import { CustomRequest, mqQueuesEnum } from "./utils/interface";
import cron from "node-cron";
import models from "./models";
import sendRabbitMQ from "./rabbitMq/send";
import amqp from "amqplib/callback_api";
import assignQuestion from "./rabbitMq/receive";

const app = express();
const port = config.PORT || 5000;
const rabbitUrl = process.env.RABBITMQ_URL || "amqp://localhost";

app.use(cors());
app.use(express.json());

declare global {
	namespace Express {
		interface Request extends CustomRequest {}
	}
}

app.use(reqLogger); // request logger
app.use("/api/v1", router);

app.get("/", (req, res) => {
	res.send("Welcome to Donda app");
});

amqp.connect(rabbitUrl, (connectionError, connection) => {
	if (connectionError) throw connectionError;
	connection.createChannel((channelError, channel) => {
		if (channelError) throw channelError;

		channel.assertQueue(mqQueuesEnum.CREATE_QUESTION, { durable: false });
		console.info(" [*] Waiting for  queue in %s. To exit press CTRL+C", mqQueuesEnum.CREATE_QUESTION);

		channel.consume(
			mqQueuesEnum.CREATE_QUESTION,
			async (msg) => {
				if (msg !== null) {
					const messageData = JSON.parse(msg.content.toString());
					await assignQuestion(messageData);
					channel.ack(msg);
				}
			},
			{ noAck: false }
		);
	});
});

// Schedule a task to run every minute
cron.schedule(
	"0 19 * * 1",
	// "* * * * *",
	async () => {
		console.log("Running a task every week");
		const cycle = await models.Cycle.findOne({ status: "active" }).sort({ createdAt: -1 }).exec();
		const questions = await models.Question.find({ cycle: cycle?._id }).exec();
		questions.map(async (question) => {
			const users = await models.User.find({
				region: question.region,
			});

			sendRabbitMQ(mqQueuesEnum.CREATE_QUESTION, JSON.stringify({ users, question: question._id }));
		});
	},
	{
		timezone: "Asia/Singapore", // Set the timezone to Singapore
	}
);

(async () => {
	process.on("warning", (e) => config.logger.warn(e.stack));
	console.log("Waiting for DATABASE Connection...");
	await db.connect();
	app.listen(config.PORT || 4000, async () => {
		console.log(`${config.APP_NAME} API listening on ${port || 4000}`);
	});
})();

process.on("unhandledRejection", (error: any) => {
	console.log("FATAL UNEXPECTED UNHANDLED REJECTION!", error.message);
	console.error("\n\n", error, "\n\n");
	//  throw error;
});

export default app;
