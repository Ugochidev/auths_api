import asyncWrapper from "../../../shared/utils/asyncWrapper";
import listUsersService from "../services/ListUsersService";

import Logger from "../../../shared/utils/logger";
const logger = new Logger("ListUsersController");

/**
* @swagger
 * /posts/{id}:
 *   get:
 *     summary: gets posts by id
 *     tags: [Auth]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: id of post
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: posts by its id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       400:
 *         description: post can not be found
 */
export default asyncWrapper(async (req, res) => {
  const { page, limit, email, startDate, endDate, isLogin } = req.query;

  const users = await listUsersService.execute({
    page,
    limit,
    email,
    startDate,
    endDate,
    isLogin,
  });

  logger.info(`Users listed successfully`);

  return res.status(200).json({
    success: true,
    message: "Users listed successfully",
    data: users,
  });
});
