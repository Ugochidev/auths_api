import asyncWrapper from "../../../shared/utils/asyncWrapper";
import deleteUserService from "../services/DeleteUserService";

export default asyncWrapper(async (req, res) => {
  const { id } = req.params;

  if (req.user !== id) {
    throw new AppError("You can only delete your own account", 403);
  }

  await deleteUserService.execute(id);

  res.status(200).json({
    status: "success",
    message: "Account deleted successfully",
  });
});
