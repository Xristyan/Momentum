import { Router } from "express";
import jiraWebhook from "../webhooks/jira.webhook";

const webhooksRouter = Router();

webhooksRouter.route("/jira").post(jiraWebhook);

export default webhooksRouter;
