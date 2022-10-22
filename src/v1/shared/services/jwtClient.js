import { sign, verify } from "jsonwebtoken";
import environment from "../../../config/environment";
import AppError from "../utils/appError";

class JwtClient {
  constructor() {
    this.accessTokenSecret = environment.jwtAccessTokenSecret;
    this.refreshTokenSecret = environment.jwtRefreshTokenSecret;
  }

  generateAccessToken(payload) {
    return sign(payload, this.accessTokenSecret, { expiresIn: "3h" });
  }

  generateRefreshToken(payload) {
    payload.type = "refresh";
    return sign(payload, this.refreshTokenSecret, { expiresIn: "7d" });
  }

  verifyAccessToken(token) {
    return verify(token, this.accessTokenSecret);
  }

  verifyRefreshToken(token) {
    if (token.type !== "refresh") {
      throw new AppError("Invalid token type", 401);
    }
    return verify(token, this.refreshTokenSecret);
  }
}

export default new JwtClient();
