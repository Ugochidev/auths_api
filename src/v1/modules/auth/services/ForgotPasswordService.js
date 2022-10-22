import AppError from "../../../shared/utils/appError";
import cache from "../../../shared/services/cache";
import userRepository from "../../users/repositories/UserRepository";
import { generateOTP, generateTempId } from "../../../shared/utils";
import tasks from "../../../shared/rabbitMQ/publisher";

class ForgotPasswordService {
  async execute({ email }) {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new AppError("Account not found", 404);
    }

    const otp = generateOTP();
    const tempId = generateTempId();
    const cachedData = {
      email: user.email,
      otp,
    };
    cache.set(tempId, cachedData, 60 * 60 * 5);

    await tasks.sendOTP(user.email, otp, true);
    return { tempId };
  }
}

export default new ForgotPasswordService();
