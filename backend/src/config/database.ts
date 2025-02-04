import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "postgres",
  host: "postgres", // Container name if using Docker, or "localhost" otherwise
  port: 5432,
  database: process.env.POSTGRES_DB,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  logging: false, // Optional: Disable logging
  ssl: true,
});

export default sequelize;
