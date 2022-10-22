import asyncWrapper from "../../../shared/utils/asyncWrapper";
import AppError from "../../../shared/utils/appError";
import getUserService from "../services/GetUserService";

export default asyncWrapper(async (req, res) => {
  const { id } = req.params;

  if (req.user !== id) {
    throw new AppError("You can only retrieve your own account", 403);
  }

  const user = await getUserService.execute({ id });

  res.status(200).json({
    status: "success",
    message: "User retrieved successfully",
    data: user,
  });
});
