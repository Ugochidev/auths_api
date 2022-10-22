import bcrypt from "bcryptjs";

import userRepository from "../../users/repositories/UserRepository";
import cache from "../../../shared/services/cache";
import environment from "../../../../config/environment";
import AppError from "../../../shared/utils/appError";

class ResetPasswordService {
  async execute({ tempId, otp, password }) {
    const cachedData = await cache.get(`${tempId}`);
    if (!cachedData) {
      throw new AppError("OTP is expired", 400);
    }
    if (cachedData.otp !== otp) {
      throw new AppError("Invalid OTP", 400);
    }
    const user = await userRepository.findByEmail(cachedData.email);
    if (!user) {
      throw new AppError("User not found", 400);
    }
    const hashedPassword = await bcrypt.hash(password, environment.saltRounds);
    user.password = hashedPassword;
    await userRepository.save(user);
    cache.delete(`${tempId}`);
  }
}

export default new ResetPasswordService();
