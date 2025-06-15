import express, { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/error";

const notFoundRouter = express.Router();

notFoundRouter.all("*", (req: Request, res: Response, next: NextFunction) => {
  const error = new CustomError(
    `Can't find ${req.originalUrl} on this server!`,
    404,
  );

  next(error);
});

export default notFoundRouter;
