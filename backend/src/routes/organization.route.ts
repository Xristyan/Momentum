import express from "express";
import {
  createOrganization,
  getAllOrganizations,
} from "../controllers/organization.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const organizationRouter = express.Router();

organizationRouter
  .route("/organizations")
  .get(authMiddleware, getAllOrganizations)
  .post(authMiddleware, createOrganization);

export default organizationRouter;
