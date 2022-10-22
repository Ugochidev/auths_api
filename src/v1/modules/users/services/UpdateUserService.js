import userRepository from "../repositories/UserRepository";
import profileRepository from "../repositories/ProfileRepository";
import AppError from "../../../shared/utils/appError";
import Logger from "../../../shared/utils/logger";

const logger = new Logger("UpdateUserService");

class UpdateUserService {
  constructor() {
    this.userRepository = userRepository;
    this.profileRepository = profileRepository;
    this.logger = logger;
  }

  async execute(id, data) {
    let user;
    try {
      user = await this.userRepository.findById(id);
    } catch (error) {
      this.logger.error(error);
      throw new AppError("Internal server error", 500);
    }

    if (!user) {
      throw new AppError("Account not found", 404);
    }
    const profileId = user.profile._id.toString();
    const profile = await this.profileRepository.update(profileId, data);
    user.profile = profile;
    return user;
  }
}

export default new UpdateUserService();
