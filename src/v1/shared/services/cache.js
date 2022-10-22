import redis from "ioredis";

import environment from "../../../config/environment";

class Cache {
  constructor() {
    this.client = redis.createClient({
      host: environment.redisHost,
      port: environment.redisPort,
    });
  }

  set(key, value, expiry = 3600) {
    this.client.set(key, JSON.stringify(value), "EX", expiry);
  }

  async get(key) {
    const value = await this.client.get(key);
    return value ? JSON.parse(value) : null;
  }

  delete(key) {
    this.client.del(key);
  }
}

export default new Cache();
