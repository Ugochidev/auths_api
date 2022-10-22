import AppError from "../../../shared/utils/appError";
import userRepository from "../../users/repositories/UserRepository";
import Logger from "../../../shared/utils/logger";

const logger = new Logger("DeleteUserService");

class DeleteUserService {
  constructor() {
    this.userRepository = userRepository;
    this.logger = logger;
  }

  async execute(id) {
    let account;
    try {
      account = await this.userRepository.delete(id);
    } catch (error) {
      this.logger.error(error);
      throw new AppError("Internal server error", 500);
    }
    if (!account) {
      throw new AppError("Account not found", 404);
    }
  }
}

export default new DeleteUserService();
