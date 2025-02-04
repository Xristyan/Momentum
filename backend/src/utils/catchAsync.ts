import { NextFunction, Response, Request } from "express";

type AsyncFunction = (
  request: Request,
  response: Response,
  next: NextFunction,
) => Promise<void>;

export const catchAsync = (fn: AsyncFunction) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};
