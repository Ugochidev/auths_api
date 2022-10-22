import asyncWrapper from "../../../shared/utils/asyncWrapper";

import changePasswordService from "../services/changePasswordService";

/**
 * @swagger
 * /change-password:
 *   post:
 *     summary: Change password
 *     tags: [Auth]
 *     description: Change password
 *     security: []
 *     parameters:
 *      - in : body
 *        name: body
 *        required: true
 *        schema:
 *          type: object
 *          required:
 *            - currentPassword
 *            - newPassword
 *          properties:
 *            currentPassword: {type: string, description: "currentPassword", example: "123456"}
 *            newPassword: {type: string, description: "newPassword", example: "123456"}
 */
export default asyncWrapper(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  await changePasswordService.execute({
    currentPassword,
    newPassword,
    userId: req.user,
  });

  return res.status(201).json({
    success: true,
    message: "Password changed successfully",
  });
});
