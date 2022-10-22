import bcrypt from "bcryptjs";

import AppError from "../../../shared/utils/appError";
import userRepository from "../../users/repositories/UserRepository";
import jwtClient from "../../../shared/services/jwtClient";
import Logger from "../../../shared/utils/logger";

class AuthenticationService {
  logger = new Logger("AuthenticationService");
  async execute({ email, password }) {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new AppError("Invalid email or password", 401);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new AppError("Invalid email or password", 401);
    }

    const payload = {
      id: user._id,
    };
    const accessToken = jwtClient.generateAccessToken(payload);
    const refreshToken = jwtClient.generateRefreshToken(payload);

    this.logger.info(`Generated access token for user: ${user.email}`);

    return { accessToken, refreshToken };
  }
}

export default new AuthenticationService();
