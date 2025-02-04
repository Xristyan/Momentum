import express, { NextFunction } from "express";
import { name } from "./test";
import sequelize from "./config/database";
import logger from "./config/logger";
import helmet from "helmet";
import "./models";
import morganMiddleware from "./middlewares/morgan.middleware";
import notFoundRoute from "./routes/notFound.route";
import errorMiddleware from "./middlewares/error.middleware";
import { CustomError } from "./error/error";

const app = express();
const port = 8000;

app.use(helmet());
app.use(morganMiddleware);
app.use(express.json({ limit: "1000kb" }));

app.get("/", async (req, res, next: NextFunction) => {
  try {
    await sequelize.authenticate();

    logger.info("Connection has been established successfully.");
    // throw new CustomError("Test Error", 400);
  } catch (error) {
    return next(error);
  }

  res.send(`Hello ${name}!!`);
});

app.use(notFoundRoute);

app.use(errorMiddleware);

process.on(
  "unhandledRejection",
  (reason: string, promise: Promise<unknown>) => {
    logger.error("Unhandled Rejection at:", promise, "reason:", reason);
  },
);

process.on("uncaughtException", (error) => {
  logger.error("Uncaught Exception:", error);
  process.exit(1);
});

app.listen(port, () => {
  logger.info(`Server running at http://localhost:${port}`);
});
