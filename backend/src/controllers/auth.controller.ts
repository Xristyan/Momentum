import { sign } from "jsonwebtoken";
import { User } from "../models";
import { catchAsync } from "../utils/catchAsync";
import { CustomError } from "../error/error";
import { compare } from "../utils/passwordHashing";
import { Response } from "express";

const attachCookies = (res: Response, token: string) => {
  const cookieOptions = {
    expires: new Date(
      Date.now() +
        Number(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
    ...(process.env.NODE_ENV === "production" && { secure: true }),
  };

  res.cookie("jwt", token, cookieOptions);
};

const signToken = (res: Response, id: number) => {
  const token = sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  attachCookies(res, token);

  return token;
};

export const Register = catchAsync(async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
  });

  const token = signToken(res, user.id);

  res.json({ user, token });
});

export const Login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new CustomError("Please provide email and password", 400));
  }

  const user = await User.unscoped().findOne({
    where: {
      email,
    },
  });

  if (!user || !(await compare(password, user.password))) {
    return next(new CustomError("Incorrect email or password", 401));
  }

  const token = signToken(res, user.id);

  res.json({ token });
});
