import express from "express";
import swaggerUI from "swagger-ui-express";
import specs from "./config/swagger";
import environment from "./config/environment";
import logger from "morgan";
import v1Routes from "./v1/routes";
import errorHandler from "./v1/shared/utils/errorHandler";

export default class App {
  constructor() {
    this.app = express();
    this.app.use(
      logger("dev", { skip: (req, res) => environment.nodeEnv === "test" })
    );
    require("./v1/shared/rabbitMQ/consumers");
    this.app.use(express.json());
    this.setRoutes();
    this.app.use(errorHandler);
  }

  setRoutes() {
    this.app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
    this.app.use("/v1", v1Routes);
  }

  getApp() {
    return this.app;
  }

  listen() {
    const { port } = environment;
    this.app.listen(port, () => {
      console.log(`Listening at port ${port}`);
    });
  }
}
