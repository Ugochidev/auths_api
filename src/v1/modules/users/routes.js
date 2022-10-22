import express from "express";
import multer from "multer";

import auth from "../../shared/middlewares/auth";
import isAdmin from "../../shared/middlewares/isAdmin";
import listUsersValidator from "./validators/listUsersParams";
import userIdValidator from "./validators/userId";
import listUsers from "./controllers/listUsers";
import getUser from "./controllers/getUser";
import updateUserValidator from "./validators/updateUser";
import updateUser from "./controllers/updateUser";
import deleteUser from "./controllers/deleteUser";

const upload = multer({ dest: "tmp/" });

const router = express.Router();

router.get("/", [auth, isAdmin, listUsersValidator], listUsers);
router.get("/:id", [auth, userIdValidator], getUser);
router.patch(
  "/:id",
  [auth, updateUserValidator, upload.single("avatar")],
  updateUser
);
router.delete("/:id", [auth, userIdValidator], deleteUser);

export default router;
