import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { Organization, User } from "../models";

export const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const users = await User.findAll({
    include: Organization,
  });

  res.json(users);
});

export const createUser = catchAsync(async (req: Request, res: Response) => {
  const newUser = await User.create({
    email: "test3@gmail.com",
    name: "Test2",
    password: "test",
  });

  res.json(newUser);
});
