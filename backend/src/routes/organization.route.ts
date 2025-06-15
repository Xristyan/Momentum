import express from "express";
import {
  createOrganization,
  deleteOrganization,
  getAllOrganizations,
  getOrganization,
  inviteUserToOrganization,
} from "../controllers/organization.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const organizationRouter = express.Router();

organizationRouter
  .route("/organizations")
  .get(authMiddleware, getAllOrganizations)
  .post(authMiddleware, createOrganization);

organizationRouter
  .route("/organizations/:id")
  .get(authMiddleware, getOrganization)
  .delete(authMiddleware, deleteOrganization);

organizationRouter
  .route("/organizations/:id/invite")
  .post(authMiddleware, inviteUserToOrganization);

export default organizationRouter;
