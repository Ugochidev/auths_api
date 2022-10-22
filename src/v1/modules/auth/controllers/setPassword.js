import asyncWrapper from "../../../shared/utils/asyncWrapper";
import setPasswordService from "../services/SetPasswordService";

/**
 * @swagger
 * /set-password:
 *   post:
 *     summary: Set password
 *     tags: [Auth]
 *     description: Set password
 *     security: []
 *     parameters:
 *      - in : body
 *        name: body
 *        required: true
 *        schema:
 *          type: object
 *          required:
 *            - password
 *            - tempId
 *            - secretKey
 *          properties:
 *            password: {type: string, description: "password", example: "123456"}
 *            tempId: {type: string, description: "tempId", example: "123456"}
 *            secretKey: {type: string, description: "secretKey", example: "123456"}
 */
export default asyncWrapper(async (req, res) => {
  const { tempId, password, secretKey } = req.body;

  const user = await setPasswordService.execute({
    tempId,
    password,
    secretKey,
  });

  return res.status(201).json({
    success: true,
    message: "Account created successfully",
    data: user,
  });
});
