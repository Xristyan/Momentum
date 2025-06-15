import express from "express";
import {
  getAllUsers,
  updateUser,
  leaveOrganization,
} from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const userRouter = express.Router();

userRouter.route("/users").get(getAllUsers);
userRouter.route("/users/profile").put(authMiddleware, updateUser);

userRouter.route("/users/leave/:id").delete(authMiddleware, leaveOrganization);

export default userRouter;
