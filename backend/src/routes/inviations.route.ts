import express from "express";
import {
  getInvitation,
  handleInvitation,
} from "../controllers/invitation.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const invitationsRouter = express.Router();

invitationsRouter
  .route("/invitations")
  .get(getInvitation)
  .post(authMiddleware, handleInvitation);

export default invitationsRouter;
