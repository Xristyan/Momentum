import { Organization, User } from "../models";
import { catchAsync } from "../utils/catchAsync";
import { CustomError } from "../error/error";

export const getAllOrganizations = catchAsync(async (req, res) => {
  const organizations = await Organization.findAll({
    include: User,
  });

  res.json(organizations);
});

export const createOrganization = catchAsync(async (req, res, next) => {
  const { name, description } = req.body;

  const user = await User.findOne({
    where: { id: req.user.id },
  });

  if (!user) {
    return next(new CustomError("User not found", 404));
  }

  const organization = await Organization.create({
    name,
    description,
  });

  await user.addOrganization(organization, { through: { role: "admin" } });

  res.json({ organization });
});
