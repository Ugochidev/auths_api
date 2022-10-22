import authenticationService from "../services/AuthenticationService";
import asyncWrapper from "../../../shared/utils/asyncWrapper";

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login User
 *     tags: [Auth]
 *     description: Login
 *     security: []
 *     parameters:
 *      - in : body
 *        name: body
 *        required: true
 *        schema:
 *          type: object
 *          required:
 *            - password
 *            - email
 *          properties:
 *            password: {type: string, description: "password", example: "123456"}
 *            email: {type: string, description: "email", example: "johndoe@example.com"}
 */
export default asyncWrapper(async (req, res) => {
  const { email, password } = req.body;

  const tokens = await authenticationService.execute({ email, password });

  return res.status(200).json({
    success: true,
    message: "Login successful",
    data: tokens,
  });
});
