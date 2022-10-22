export default {
  port: parseInt(process.env.PORT) || 8000,
  nodeEnv: process.env.NODE_ENV || "production",
  saltRounds: parseInt(process.env.SALT_ROUNDS) || 10,
  jwtAccessTokenSecret:
    process.env.JWT_ACCESS_TOKEN_SECRET ||
    "03afc0820d376f9fdb1e8faa460902c6f74705feb01f101c480f4205964e3e10",
  jwtRefreshTokenSecret:
    process.env.JWT_REFRESH_TOKEN_SECRET ||
    "7bfd6e6512e8ac8b56e31cfbdbe767892a87075039d4a524b2b2ddcb2fb2c69f",
  redisHost: process.env.REDIS_HOST || "redis",
  redisPort: parseInt(process.env.REDIS_PORT) || 6379,
  sendgridApiKey: process.env.SENDGRID_API_KEY || "",
  defaultMailSender: process.env.DEFAULT_MAIL_SENDER || "",
  amqpUrl: process.env.AMQP_URL || "amqp://localhost:5672",
  cloudinaryURL: process.env.CLOUDINARY_URL || "",
  secretKey: process.env.SECRET_KEY || "",
};
