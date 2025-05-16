import cloudinary from "../config/cloudinary";
/**
 * Upload an image to Cloudinary
 * @param base64Image - Base64 encoded image string
 * @param folder - Cloudinary folder to store the image in
 * @returns The URL of the uploaded image
 */
export const uploadImage = async (
  base64Image: string,
  folder = "user-profiles",
): Promise<string> => {
  try {
    // Check if Cloudinary is configured
    if (
      !process.env.CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET
    ) {
      throw new Error("Cloudinary environment variables are not configured");
    }

    // Handle Data URI - no need to add prefix if it already exists
    let imageToUpload = base64Image;

    // If this is a base64 string without a data URI prefix, add one
    // Most data URIs already contain the prefix "data:image/xxx;base64,"
    if (!base64Image.startsWith("data:image")) {
      imageToUpload = `data:image/png;base64,${base64Image}`;
    }

    const result = await cloudinary.uploader.upload(imageToUpload, {
      folder,
      // Use transformation to optimize the image
      transformation: [
        { width: 500, height: 500, crop: "limit" },
        { quality: "auto" },
      ],
    });

    return result.secure_url;
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw new Error("Failed to upload image");
  }
};

/**
 * Delete an image from Cloudinary
 * @param imageUrl - URL of the image to delete
 */
export const deleteImage = async (imageUrl: string): Promise<void> => {
  try {
    // Extract public_id from the URL
    const urlParts = imageUrl.split("/");
    const fileName = urlParts[urlParts.length - 1];
    const publicId = `${urlParts[urlParts.length - 2]}/${fileName.split(".")[0]}`;

    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error);
  }
};
