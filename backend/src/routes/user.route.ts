import express from "express";
import {
  getAllUsers,
  createUser,
  updateUser,
} from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const userRouter = express.Router();

userRouter.route("/users").get(getAllUsers).post(createUser);
userRouter.route("/users/profile").put(authMiddleware, updateUser);

export default userRouter;
