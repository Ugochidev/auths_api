import pino from "pino";
import environment from "../../../config/environment";

class Logger {
  constructor(filename) {
    this.isProd = environment.nodeEnv === "production";
    this.config = {
      name: filename,
      level: "info",
      messageKey: "msg",
    };
    if (!this.isProd) {
      this.config.transport = {
        target: "pino-pretty",
        options: {
          colorize: true,
        },
      };
    }
    this.logger = pino(this.config);
  }

  info(message) {
    this.logger.info(message);
  }

  debug(message) {
    this.logger.debug(message);
  }

  error(message) {
    this.logger.error(message);
  }
}

export default Logger;