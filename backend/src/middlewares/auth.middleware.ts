import { CustomError } from "../error/error";
import { Organization, User } from "../models";
import { catchAsync } from "../utils/catchAsync";
import { verifyToken } from "../utils/jwt";

export const authMiddleware = catchAsync(async (req, res, next) => {
  if (
    !req?.headers?.authorization ||
    !req?.headers?.authorization?.startsWith("Bearer")
  ) {
    return next(new CustomError("Not authorized to access this route", 401));
  }

  const token = req.headers.authorization.split(" ")[1];

  const decoded = await verifyToken(token);

  const user = await User.findByPk(decoded.id, {
    include: Organization,
  });

  if (!user) {
    return next(new CustomError("User not found", 404));
  }

  req.user = user;

  next();
});
