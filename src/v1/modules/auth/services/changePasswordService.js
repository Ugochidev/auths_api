import bcrypt from "bcryptjs";
import AppError from "../../../shared/utils/appError";
import userRepository from "../../users/repositories/UserRepository";
import environment from "../../../../config/environment";

class ChangePasswordService {
  async execute({ currentPassword, newPassword, userId }) {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new AppError("User not found");
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      throw new AppError("Incorrect password");
    }

    user.password = await bcrypt.hash(newPassword, environment.saltRounds);

    await userRepository.save(user);

    return user;
  }
}

export default new ChangePasswordService();
