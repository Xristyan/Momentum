import { CreationOptional, DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

type InvitationAttributes = {
  id?: number;
  organizationId: number;
  email: string;
  status: string;
  token: string;
  expiresAt: Date;
};

export class InvitationInstance extends Model<InvitationAttributes> {
  declare id: CreationOptional<number>;
  declare organizationId: number;
  declare email: string;
  declare status: string;
  declare token: string;
  declare expiresAt: Date;
}

const Invitation = sequelize.define(
  "Invitation",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    organizationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "accepted", "rejected"),
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "Invitations",
    timestamps: false,
  },
);

export default Invitation;
