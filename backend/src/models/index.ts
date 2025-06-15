import sequelize from "../config/database";
import User from "./user.model";
import Organization from "./organization.model";
import Membership from "./membership.model";
import IntegrationTechnologies from "./integrationTechnologies.model";
import logger from "../config/logger";
import Invitation from "./invitation.model";
import XpTracking from "./xpTracking.model";

// Many-to-many relationship
User.belongsToMany(Organization, { through: Membership });
Organization.belongsToMany(User, { through: Membership });

// Direct associations with Membership (needed for including with XpTracking)
Organization.hasMany(Membership, { foreignKey: "OrganizationId" });
Membership.belongsTo(Organization, { foreignKey: "OrganizationId" });

User.hasMany(Membership, { foreignKey: "UserId" });
Membership.belongsTo(User, { foreignKey: "UserId" });

// XP Tracking relationships
Membership.hasMany(XpTracking, { foreignKey: "membershipId" });
XpTracking.belongsTo(Membership, { foreignKey: "membershipId" });

sequelize
  .sync({ alter: true })
  .then(() => logger.info("Database synchronized"))
  .catch((error) => logger.error("Error synchronizing database:", error));

export {
  User,
  Organization,
  Membership,
  IntegrationTechnologies,
  Invitation,
  XpTracking,
};
