import { CreationOptional, DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

type MembershipAttributes = {
  id?: number;
  role: string;
  creator: boolean;
  xp: number;
};

export class MembershipInstance extends Model<MembershipAttributes> {
  declare id: CreationOptional<number>;
  declare role: string;
  declare creator: boolean;
  declare xp: number;
}

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
    creator: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
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
