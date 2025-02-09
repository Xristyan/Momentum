import express from "express";
import { Login, Register } from "../controllers/auth.controller";

const authRouter = express.Router();

authRouter.post("/signin", Register);

authRouter.post("/login", Login);

export default authRouter;
