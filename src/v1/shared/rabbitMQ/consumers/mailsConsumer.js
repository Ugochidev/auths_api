const amqplib = require("amqplib");
import environment from "../../../../config/environment";
import emailService from "../../services/emailService";

async function processSendMail(msg) {
  const data = JSON.parse(msg.content);
  const { email, otp, passReset } = data;
  await emailService.sendOTP(email, otp, passReset);
}

(async () => {
  const connection = await amqplib.connect(environment.amqpUrl, "heartbeat=60");
  const channel = await connection.createChannel();
  channel.prefetch(10);
  const queue = "auth.emails";
  process.once("SIGINT", async () => {
    console.log("got sigint, closing connection");
    await channel.close();
    await connection.close();
    process.exit(0);
  });

  await channel.assertQueue(queue, { durable: true });
  await channel.consume(
    queue,
    async (msg) => {
      console.log("processing messages");
      await processSendMail(msg);
      channel.ack(msg);
    },
    {
      noAck: false,
      consumerTag: "email_consumer",
    }
  );
  console.log(" [*] Waiting for messages. To exit press CTRL+C");
})();
