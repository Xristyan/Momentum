import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { Organization, User } from "../models";
import { CustomError } from "../error/error";
import { uploadImage, deleteImage } from "../utils/cloudinaryUpload";

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

export const updateUser = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const { name, picture } = req.body;

  // Validation
  if (!name || typeof name !== "string" || name.trim() === "") {
    return next(new CustomError("Valid name is required", 400));
  }

  // Find the user
  const user = await User.findByPk(userId);

  if (!user) {
    return next(new CustomError("User not found", 404));
  }

  // Update user data object
  const updateData: any = { name };

  // Process image upload if provided
  if (picture !== undefined) {
    try {
      // If picture is a base64 string, upload to cloudinary
      if (picture && picture.startsWith("data:image")) {
        // If user already has a picture, delete it from cloudinary
        if (user.picture && user.picture.includes("cloudinary.com")) {
          await deleteImage(user.picture);
        }

        // Upload new image to cloudinary and get URL
        const imageUrl = await uploadImage(picture);
        updateData.picture = imageUrl;
      } else if (picture === null || picture === "") {
        // If picture is null or empty, remove the existing picture
        if (user.picture && user.picture.includes("cloudinary.com")) {
          await deleteImage(user.picture);
        }
        updateData.picture = null;
      }
      // Otherwise, keep the picture field unchanged (just a regular URL)
    } catch (error) {
      return next(new CustomError("Error uploading image", 500));
    }
  }

  // Update user in database
  await user.update(updateData);

  // Return updated user
  const updatedUser = await User.findByPk(userId, {
    include: Organization,
  });

  res.status(200).json({
    success: true,
    data: updatedUser,
  });
});
