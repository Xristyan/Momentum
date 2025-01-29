import express from "express";
import { name } from "./test";
import { DataTypes, Sequelize } from "sequelize";

const app = express();
const port = 8000;

// Option 1: Passing a connection URI

const sequelize = new Sequelize(
  `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@postgres:5432/${process.env.POSTGRES_DB}`,
); // Example for postgres

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.CHAR,
    },
  },
  {
    tableName: '"Users"', // Case-sensitive table name with double quotes
    schema: "public", // Public schema
    timestamps: false, //
  },
);

app.get("/test", async (req, res) => {
  res.json({ test: "test" });
});

app.get("/", async (req, res) => {
  try {
    await sequelize.authenticate();

    const users = await User.findAll(); // Query all users

    // Send the users as JSON response
    console.log("users", users);

    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
  res.send(`Hello ${name}!`);
});

console.log("Hello World!");

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
