import { Organization, User, Membership } from "../models";
import { catchAsync } from "../utils/catchAsync";
import { CustomError } from "../error/error";

export const getOrganization = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const organization = await Organization.findByPk(id, {
    include: User,
  });

  if (!organization) {
    return next(new CustomError("Organization not found", 404));
  }

  res.json(organization);
});

export const getAllOrganizations = catchAsync(async (req, res) => {
  const organizations = await Organization.findAll({
    include: User,
  });

  res.json(organizations);
});

export const createOrganization = catchAsync(async (req, res, next) => {
  const { name, description, technologies } = req.body;

  if (!name || !technologies) {
    return next(new CustomError("Missing required fields", 400));
  }

  const user = await User.findOne({
    where: { id: req.user.id },
  });

  if (!user) {
    return next(new CustomError("User not found", 404));
  }

  const organization = await Organization.create({
    name,
    description,
    technologies,
  });

  await user.addOrganization(organization, { through: { role: "admin" } });

  res.json({ organization });
});

export const deleteOrganization = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id;

  // Find the organization
  const organization = await Organization.findByPk(id);

  if (!organization) {
    return next(new CustomError("Organization not found", 404));
  }

  const membership = await Membership.findOne({
    where: {
      UserId: userId,
      OrganizationId: id,
      role: "admin",
    },
  });

  if (!membership) {
    return next(
      new CustomError(
        "You don't have permission to delete this organization",
        403,
      ),
    );
  }

  await organization.destroy();

  res
    .status(200)
    .json({ success: true, message: "Organization deleted successfully" });
});
