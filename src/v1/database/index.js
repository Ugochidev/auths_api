const mongoose = require("mongoose");

export default class Database {
  constructor(environment, dbConfig) {
    this.environment = environment;
    this.dbConfig = dbConfig;
    this.isTestEnvironment = this.environment === "test";
  }

  async connect() {
    try {
      mongoose.connect(this.dbConfig[this.environment].dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Database connection successful");
    } catch (err) {
      console.error("Database connection error \n", err.stack);
    }
  }
}
