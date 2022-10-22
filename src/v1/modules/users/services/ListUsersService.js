import AppError from "../../../shared/utils/appError";
import userRepository from "../repositories/UserRepository";

class ListUsersService {
  constructor() {
    this.userRepository = userRepository;
  }

  async execute({ page, limit, email, startDate, endDate, isLogin }) {
    if ((startDate && !endDate) || (!startDate && endDate)) {
      throw new AppError(
        "Start date and end date must be provided together",
        400
      );
    }

    const users = await this.userRepository.list({
      page,
      limit,
      email,
      startDate,
      endDate,
      isLogin,
    });

    return users;
  }
}

export default new ListUsersService();
