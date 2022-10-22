import asyncWrapper from "../../../shared/utils/asyncWrapper";
import updateUserService from "../services/UpdateUserService";
import UploadService from "../../../shared/services/upload";

const uploadService = new UploadService();

export default asyncWrapper(async (req, res) => {
  const { id } = req.params;
  if (req.user !== id) {
    throw new AppError("You can only update your own profile", 403);
  }

  if (req.file) {
    if (
      !req.file.originalname.endsWith("jpg") &&
      !req.file.originalname.endsWith("jpeg") &&
      !req.file.originalname.endsWith("png")
    ) {
      await unlink(`${req.file.path}`);
      return res.status(400).json({
        status: "failure",
        message: "Please upload a valid jpg, png or jpeg file",
      });
    }
    const options = {
      resourceType: "image",
      publicId: `profile/${id}/avatar`,
      filePath: req.file.path,
      reqBody: req.body,
    };
    await uploadService.execute(options);

    const user = await updateUserService.execute(id, req.body);

    return res.status(200).json({
      status: "success",
      message: "User profile updated successfully",
      data: user,
    });
  }
});
