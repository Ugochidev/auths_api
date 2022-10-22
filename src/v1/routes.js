import express from "express";
import authRoutes from "./modules/auth/routes";
import usersRoutes from "./modules/users/routes";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", usersRoutes);

export default router;
