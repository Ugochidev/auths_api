import userRepository from "../../modules/users/repositories/UserRepository";
import AppError from "../utils/appError";
import asyncWrapper from "../utils/asyncWrapper";

export default asyncWrapper(async (req, res, next) => {
  const user = await userRepository.findById(req.user);
  console.log(user);
  if (user.role !== "ADMIN") {
    throw new AppError("Only an Admin can perform this action", 403);
  }
  next();
});
