import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const UserProgress = sequelize.define(
  "UserProgress",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Users", key: "id" },
    },
    organizationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Organizations", key: "id" },
    },
    xp: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    tableName: "UserProgress",
    timestamps: false,
  },
);

export default UserProgress;
