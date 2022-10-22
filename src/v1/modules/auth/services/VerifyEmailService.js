import { v4 as uuid } from "uuid";
import AppError from "../../../shared/utils/appError";
import cache from "../../../shared/services/cache";
import { generateTempId } from "../../../shared/utils";

class VerifyEmailService {
  async execute({ tempId, otp }) {
    const cachedData = await cache.get(tempId);

    if (!cachedData || cachedData.otp !== otp) {
      throw new AppError("Invalid or expired otp");
    }

    cache.delete(tempId);

    const newCachedData = {
      email: cachedData.email,
      isVerified: true,
    };
    const newTempId = generateTempId();
    cache.set(newTempId, newCachedData, 60 * 60 * 5);

    return { tempId: newTempId };
  }
}

export default new VerifyEmailService();
