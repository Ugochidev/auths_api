import AppError from "../../../shared/utils/appError";
import userRepository from "../../users/repositories/UserRepository";
import cache from "../../../shared/services/cache";
import { generateOTP, generateTempId } from "../../../shared/utils";
import tasks from "../../../shared/rabbitMQ/publisher";

class RegistrationService {
  async execute(data) {
    const userExists = await userRepository.findByEmail(data.email);
    if (userExists) {
      throw new AppError("User already exists");
    }
    const otp = generateOTP();
    const cachedData = {
      email: data.email,
      isVerified: false,
      otp,
    };
    const tempId = generateTempId();
    cache.set(tempId, cachedData, 60 * 60 * 5);

    await tasks.sendOTP(data.email, otp);

    return { tempId };
  }
}

export default new RegistrationService();
