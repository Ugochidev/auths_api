import amqplib from "amqplib";
import { generateTempId } from "../utils";
import environment from "../../../config/environment";

class BackgroundTask {
  constructor() {
    this.connection = null;
    this.channel = null;
  }

  async connect() {
    this.connection = await amqplib.connect(
      environment.amqpUrl,
      "heartbeat=60"
    );
    this.channel = await this.connection.createChannel();
  }

  async sendOTP(email, otp, passReset = false) {
    await this.connect();
    try {
      console.log("Publishing");
      const exchange = "user.signed_up";
      const queue = "auth.emails";
      const routingKey = "auth.sign_up_email";

      await this.channel.assertExchange(exchange, "direct", { durable: true });
      await this.channel.assertQueue(queue, { durable: true });
      await this.channel.bindQueue(queue, exchange, routingKey);

      const msg = {
        id: generateTempId(),
        email,
        otp,
        passReset,
      };
      this.channel.publish(
        exchange,
        routingKey,
        Buffer.from(JSON.stringify(msg))
      );
      console.log("Message published");
    } catch (e) {
      console.error("Error in publishing message", e);
    } finally {
      console.info("Closing channel and connection if available");
      await this.closeConnection();
      console.info("Channel and connection closed");
    }
  }

  async closeConnection() {
    await this.channel.close();
    await this.connection.close();
  }
}

export default new BackgroundTask();
