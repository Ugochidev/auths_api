import asyncWrapper from "../../../shared/utils/asyncWrapper";
import resetPasswordService from "../services/ResetPasswordService";


/**
 * @swagger
 * /reset-password:
 *   post:
 *     summary: Reset password
 *     tags: [Auth]
 *     description: Reset password
 *     security: []
 *     parameters:
 *      - in : body
 *        name: body
 *        required: true
 *        schema:
 *          type: object
 *          required:
 *            - otp
 *            - tempId
 *            - password
 *          properties:
 *            otp: {type: string, description: "otp", example: "123456"}
 *            tempId: {type: string, description: "tempId", example: "123456"}
 *            password: {type: string, description: "password", example: "123456"}
 */
export default asyncWrapper(async (req, res) => {
  const { tempId, otp, password } = req.body;
  await resetPasswordService.execute({ tempId, otp, password });

  return res.status(201).json({
    success: true,
    message: "Password reset successfully",
  });
});
