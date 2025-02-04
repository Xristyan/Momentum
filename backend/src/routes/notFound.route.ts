import express, { NextFunction, Request, Response } from "express";
import { CustomError } from "../error/error";

const notFoundRoute = express.Router();

notFoundRoute.all("*", (req: Request, res: Response, next: NextFunction) => {
  const error = new CustomError(
    `Can't find ${req.originalUrl} on this server!`,
    404,
  );

  next(error);
});

export default notFoundRoute;
