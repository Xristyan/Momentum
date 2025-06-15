import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const IntegrationTechnologies = sequelize.define("IntegrationTechnologies", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default IntegrationTechnologies;
