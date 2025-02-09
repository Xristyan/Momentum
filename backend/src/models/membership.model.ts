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
    role: {
      type: DataTypes.ENUM("admin", "member"),
      allowNull: false,
      defaultValue: "member",
    },
    xp: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    tableName: "Memberships",
    timestamps: false,
  },
);

export default Membership;
