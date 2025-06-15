import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { Membership, Organization, User } from "../models";
import { CustomError } from "../errors/error";
import { uploadImage, deleteImage } from "../utils/cloudinaryUpload";

export const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const users = await User.findAll({
    include: Organization,
  });

  res.json(users);
});

export const leaveOrganization = catchAsync(async (req, res, next) => {
  const { id: organizationId } = req.params;
  const userId = req.user.id;

  const organization = await Organization.findByPk(organizationId);

  if (!organization) {
    return next(new CustomError("Organization not found", 404));
  }

  const membership = await Membership.findOne({
    where: {
      UserId: userId,
      OrganizationId: organizationId,
      creator: false,
    },
  });

  if (!membership) {
    return next(
      new CustomError("You are not a member of this organization", 403),
    );
  }

  await membership.destroy();

  res.status(200).json({
    success: true,
    message: "You have left the organization",
  });
});

export const updateUser = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const { name, picture } = req.body;

  if (!name || typeof name !== "string" || name.trim() === "") {
    return next(new CustomError("Valid name is required", 400));
  }

  const user = await User.findByPk(userId);

  if (!user) {
    return next(new CustomError("User not found", 404));
  }

  const updateData: {
    name: string;
    picture?: string;
  } = { name };

  if (picture !== undefined) {
    try {
      if (picture && picture.startsWith("data:image")) {
        if (user.picture && user.picture.includes("cloudinary.com")) {
          await deleteImage(user.picture);
        }

        const imageUrl = await uploadImage(picture);
        updateData.picture = imageUrl;
      } else if (!picture) {
        if (user.picture && user.picture.includes("cloudinary.com")) {
          await deleteImage(user.picture);
        }
        updateData.picture = undefined;
      }
    } catch {
      return next(new CustomError("Error uploading image", 500));
    }
  }

  await user.update(updateData);

  const updatedUser = await User.findByPk(userId, {
    include: Organization,
  });

  res.status(200).json({
    success: true,
    data: updatedUser,
  });
});
