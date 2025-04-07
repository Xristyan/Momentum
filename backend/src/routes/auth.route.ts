import express from "express";
import {
  AuthMe,
  Login,
  Register,
  googleLogin,
} from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const authRouter = express.Router();

authRouter.post("/register", Register);
authRouter.post("/login", Login);
authRouter.get("/me", authMiddleware, AuthMe);

// Google OAuth route
authRouter.post("/google/login", googleLogin);

export default authRouter;
