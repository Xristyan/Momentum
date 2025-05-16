import express from "express";
import {
  createOrganization,
  deleteOrganization,
  getAllOrganizations,
  getOrganization,
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

export default organizationRouter;
