import { sign } from "jsonwebtoken";
import { User } from "../models";
import { catchAsync } from "../utils/catchAsync";
import { CustomError } from "../errors/error";
import { compare } from "../utils/passwordHashing";
import { Response } from "express";

const attachCookies = (
  res: Response,
  token: string,
  rememberMe: boolean = false,
) => {
  const cookieOptions = {
    expires: new Date(
      Date.now() +
        (rememberMe
          ? 30 * 24 * 60 * 60 * 1000
          : Number(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000),
    ),
    httpOnly: true,
    ...(process.env.NODE_ENV === "production" && { secure: true }),
  };

  res.cookie("jwt", token, cookieOptions);
};

const signToken = (res: Response, id: number, rememberMe: boolean = false) => {
  const token = sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: rememberMe ? "30d" : process.env.JWT_EXPIRES_IN,
  });

  attachCookies(res, token, rememberMe);

  return token;
};

export const Register = catchAsync(async (req, res, next) => {
  const { email, password, name = null } = req.body;

  if (!email || !password) {
    return next(new CustomError("Please provide email and password", 400));
  }
  const existingUser = await User.findOne({
    where: {
      email,
    },
  });

  if (existingUser) {
    return next(new CustomError("User already exists", 400));
  }

  const user = await User.create({
    email,
    password,
    name,
  });

  const token = signToken(res, user.id);

  res.json({ user, token });
});

export const Login = catchAsync(async (req, res, next) => {
  const { email, password, rememberMe } = req.body;

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

  const token = signToken(res, user.id, rememberMe);

  res.json({ token });
});

export const AuthMe = catchAsync(async (req, res) => {
  const user = req.user.toJSON();
  res.json({ data: user });
});

// Google OAuth login controller
export const googleLogin = catchAsync(async (req, res, next) => {
  const { email, name, googleId, picture } = req.body;

  if (!email || !googleId) {
    return next(new CustomError("Email and Google ID are required", 400));
  }

  let user = await User.findOne({
    where: { googleId },
  });

  if (!user) {
    user = await User.findOne({
      where: { email },
    });

    if (user) {
      await user.update({
        googleId,
        ...(picture && { picture }),
      });
    } else {
      user = await User.create({
        email,
        name: name || email.split("@")[0],
        googleId,
        picture,
        password: "",
        isVerified: true,
      });
    }
  }

  // Generate JWT token
  const token = signToken(res, user.id, true);

  res.json({
    success: true,
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
  });
});
