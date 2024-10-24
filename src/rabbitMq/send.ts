import amqp from "amqplib/callback_api";
import dotenv from "dotenv";

dotenv.config();

const rabbitUrl = process.env.RABBITMQ_URL || "amqp://localhost";

const sendRabbitMQ = (queueName: string, data: string) => {
	if (typeof data !== "string") data = JSON.stringify(data);

	amqp.connect(rabbitUrl, (connectionError, connection) => {
		if (connectionError) throw connectionError;

		connection.createChannel((channelError, channel) => {
			if (channelError) throw channelError;

			channel.assertQueue(queueName, { durable: false });
			channel.sendToQueue(queueName, Buffer.from(data));
		});

		setTimeout(() => {
			connection.close();
		}, 500);
	});
};

export default sendRabbitMQ;
