import { NextFunction, Request, Response } from "express";
import { CustomError } from "../error/error";
import logger from "../config/logger";
import axios, { AxiosError } from "axios";

const handleAxiosError = (
  err: AxiosError,
  res: Response,
  isProd: boolean = false,
) => {
  const jsonResponse = {
    status: "error",
    message: err.message,
    ...(!isProd && { stack: err.stack, error: err.response?.data }),
  };

  const statusCode = err.response?.status ?? (err.request ? 408 : 500);

  res.status(statusCode).json(jsonResponse);
};

const developmentError = (err: CustomError | AxiosError, res: Response) => {
  logger.error(`${err}`);

  if (axios.isAxiosError(err)) {
    return handleAxiosError(err, res);
  }

  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const productionError = (err: CustomError | AxiosError, res: Response) => {
  logger.error(`${err}`);

  if (axios.isAxiosError(err)) {
    return handleAxiosError(err, res);
  }

  if (err.isOperational) {
    res
      .status(err.statusCode)
      .json({ status: err.status, message: err.message });
  } else {
    res.status(500).json({
      status: "error",
      message: "Something went wrong!",
    });
  }
};

export const errorMiddleware = (
  err: CustomError | Error | AxiosError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  const error =
    err instanceof CustomError
      ? err
      : axios.isAxiosError(err)
        ? err
        : new CustomError(err.message, 500, false);

  if (process.env.NODE_ENV === "development") {
    return developmentError(error, res);
  }

  productionError(error, res);
};

export default errorMiddleware;
