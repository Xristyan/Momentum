import {
  Organization,
  User,
  Membership,
  Invitation,
  XpTracking,
} from "../models";
import { catchAsync } from "../utils/catchAsync";
import { CustomError } from "../errors/error";
import { sendMessage } from "../utils/sqs";
import { InvitationStatus } from "../types/modelTypes/invitation";
import { v4 as uuidv4 } from "uuid";
import { InvitationInstance } from "../models/invitation.model";
import { EmailTypeEnum } from "../types/awsTypes/sqs";
import { MembershipInstance } from "../models/membership.model";

export const getOrganization = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const organization = await Organization.findByPk(id, {
    include: [
      User,
      {
        model: Membership,
        include: [XpTracking],
      },
    ],
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

  await user.addOrganization(organization, {
    through: { role: "admin", creator: true },
  });

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

  const membership = (await Membership.findOne({
    where: {
      UserId: userId,
      OrganizationId: id,
      role: "admin",
    },
  })) as MembershipInstance;

  if (!membership || !membership.creator) {
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

export const inviteUserToOrganization = catchAsync(async (req, res, next) => {
  const { id: organizationId } = req.params;
  const { email } = req.body;

  if (!email) {
    return next(new CustomError("Email is required", 400));
  }

  const userInvitation = (await Invitation.findOne({
    where: {
      organizationId,
      email,
      status: InvitationStatus.PENDING,
    },
  })) as InvitationInstance;

  if (userInvitation && userInvitation.expiresAt > new Date()) {
    return next(new CustomError("User already invited", 400));
  }

  const token = uuidv4();

  await Invitation.create({
    organizationId,
    email,
    status: InvitationStatus.PENDING,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
    token,
  });

  await sendMessage({
    type: EmailTypeEnum.InviteToOrganization,
    email,
    href: `${process.env.FRONTEND_URL}/invite?token=${token}`,
  });

  res.json({ success: true, message: "User invited successfully" });
});
