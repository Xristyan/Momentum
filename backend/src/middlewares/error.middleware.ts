import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/error";
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

const developmentError = (
  err:
    | CustomError
    | AxiosError
    | (Error & { status: string; statusCode: number; isOperational?: boolean }),
  res: Response,
) => {
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

const productionError = (
  err:
    | CustomError
    | AxiosError
    | (Error & { status: string; statusCode: number; isOperational?: boolean }),
  res: Response,
) => {
  if (axios.isAxiosError(err)) {
    return handleAxiosError(err, res, true);
  }

  if (err.isOperational) {
    res
      .status(err.statusCode)
      .json({ status: err.status, message: err.message });
  } else {
    res.status(500).json({
      status: err.status,
      message: "Something went wrong!",
    });
  }
};

export const errorMiddleware = (
  err:
    | CustomError
    | (Error & {
        status: string;
        statusCode: number;
        isOperational?: boolean;
      })
    | AxiosError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!axios.isAxiosError(err)) {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";
  }

  logger.error(`${err}`);

  if (process.env.NODE_ENV === "development") {
    return developmentError(err, res);
  }

  productionError(err, res);

  next();
};

export default errorMiddleware;
