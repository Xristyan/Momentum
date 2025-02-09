import express from "express";

//Config
import logger from "./config/logger";
import helmet from "helmet";
import limiter from "./config/rateLimit";
import hpp from "hpp";

//Models
import "./models";

//Middleware
import morganMiddleware from "./middlewares/morgan.middleware";
import errorMiddleware from "./middlewares/error.middleware";

//Routes
import notFoundRouter from "./routes/notFound.route";
import userRouter from "./routes/user.route";
import authRouter from "./routes/auth.route";
import organizationRouter from "./routes/organization.route";

const app = express();
const port = process.env.PORT;

app.use(helmet());
app.use(morganMiddleware);
app.use(limiter);
app.use(express.json({ limit: "1000kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(hpp());

app.use("/auth", authRouter);
app.use(userRouter);
app.use(organizationRouter);
app.use(notFoundRouter);

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
