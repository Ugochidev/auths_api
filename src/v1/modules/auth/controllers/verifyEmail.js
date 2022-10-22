import verifyEmailService from "../services/VerifyEmailService";
import asyncWrapper from "../../../shared/utils/asyncWrapper";

/**
 * @swagger
 * /verify-email:
 *   post:
 *     summary: Verify email
 *     tags: [Auth]
 *     description: Verify OTP sent to your email
 *     security: []
 *     parameters:
 *      - in : body
 *        name: body
 *        required: true
 *        schema:
 *          type: object
 *          required:
 *            - otp
 *            - temp
 *          properties:
 *            otp: {type: string, description: "OTP", example: "123456"}
 *            tempId: {type: string, description: "tempId", example: "123456"}
 */
export default asyncWrapper(async (req, res) => {
  const { tempId, otp } = req.body;

  const data = await verifyEmailService.execute({
    tempId,
    otp,
  });

  return res.status(200).json({
    success: true,
    message: "Email verified successfully",
    data,
  });
});
