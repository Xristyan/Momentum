import { CreationOptional, DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

type XpTrackingAttributes = {
  id?: number;
  membershipId: number;
  sourceType: "jira" | "microsoft-teams" | "github";
  sourceIdentifier: string; // Issue key, task ID, etc.
  xpAmount: number;
  dateAwarded: Date;
  description?: string;
};

export class XpTrackingInstance extends Model<XpTrackingAttributes> {
  declare id: CreationOptional<number>;
  declare membershipId: number;
  declare sourceType: "jira" | "microsoft-teams" | "github";
  declare sourceIdentifier: string;
  declare xpAmount: number;
  declare dateAwarded: Date;
  declare description?: string;
}

const XpTracking = sequelize.define(
  "XpTracking",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    membershipId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Memberships",
        key: "id",
      },
    },
    sourceType: {
      type: DataTypes.ENUM("jira", "microsoft-teams", "github"),
      allowNull: false,
    },
    sourceIdentifier: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    xpAmount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dateAwarded: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "XpTrackings",
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["membershipId", "sourceType", "sourceIdentifier"],
        name: "unique_xp_award",
      },
    ],
  },
);

export default XpTracking;
