import AppError from "../../../shared/utils/appError";
import userRepository from "../repositories/UserRepository";

class GetUserService {
  constructor() {
    this.userRepository = userRepository;
  }

  async execute({ id }) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return user;
  }
}

export default new GetUserService();
