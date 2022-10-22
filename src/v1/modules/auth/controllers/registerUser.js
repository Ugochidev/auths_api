import registrationService from "../services/RegistrationService";
import asyncWrapper from "../../../shared/utils/asyncWrapper";

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register User
 *     tags: [Auth]
 *     description: Send email to user to verify account
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
module.exports = asyncWrapper(async (req, res) => {
  const { email } = req.body;

  const user = await registrationService.execute({ email });

  return res.status(200).json({
    success: true,
    message: "OTP sent to your email",
    data: user,
  });
});
