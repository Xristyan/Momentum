import { Router } from "express";
import {
  createTechnology,
  getTechnologies,
} from "../controllers/technologies.controller";

const technologiesRouter = Router();

technologiesRouter
  .route("/integrations/technologies")
  .get(getTechnologies)
  .post(createTechnology);

export default technologiesRouter;
