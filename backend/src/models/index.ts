import sequelize from "../config/database";
import User from "./user.model";
import Organization from "./organization.model";
import Membership from "./membership.model";
import UserProgress from "./userProgress.model";
import logger from "../config/logger";

sequelize
  .sync({ alter: true })
  .then(() => logger.info("Database synchronized"))
  .catch((error) => logger.error("Error synchronizing database:", error));

export { User, Organization, Membership, UserProgress };
