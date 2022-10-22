import express from "express";
import {
  registerUser,
  verifyEmail,
  setPassword,
  loginUser,
  changePassword,
  forgotPassword,
  resetPassword,
} from "./controllers";
import {
  emailValidator,
  verifyEmailValidator,
  setPasswordValidator,
  loginValidator,
  changePasswordValidator,
  resetPasswordValidator,
} from "./validators";
import auth from "../../shared/middlewares/auth";

const router = express.Router();

/**
 * @swagger
 *  tags:
 *    name: Auth
 *    description: Authentication operations
 */

router.post("/register", emailValidator, registerUser);
router.post("/verify-email", verifyEmailValidator, verifyEmail);
router.post("/set-password", setPasswordValidator, setPassword);
router.post("/login", loginValidator, loginUser);
router.post(
  "/change-password",
  [auth, changePasswordValidator],
  changePassword
);
router.post("/forgot-password", emailValidator, forgotPassword);
router.post("/reset-password", resetPasswordValidator, resetPassword);

export default router;
