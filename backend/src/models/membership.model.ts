import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const Membership = sequelize.define(
  "Membership",
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
    role: {
      type: DataTypes.ENUM("admin", "member"),
      allowNull: false,
      defaultValue: "member",
    },
  },
  {
    tableName: "Memberships",
    timestamps: false,
  },
);

export default Membership;
