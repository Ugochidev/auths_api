import asyncWrapper from "../../../shared/utils/asyncWrapper";
import forgotPassword from "../services/ForgotPasswordService";

/**
 * @swagger
 * /forgot-password:
 *   post:
 *     summary: forgot password
 *     tags: [Auth]
 *     description: forgot password
 *     security: []
 *     parameters:
 *      - in : body
 *        name: body
 *        required: true
 *        schema:
 *          type: object
 *          required:
 *            - email
 *          properties:
 *            email: {type: string, description: "email", example: "johndoe@example.com"}
 */
export default asyncWrapper(async (req, res) => {
  const { email } = req.body;

  const otp = await forgotPassword.execute({ email });

  return res.status(201).json({
    success: true,
    message: "Password reset OTP has been sent to your email",
    data: otp,
  });
});
