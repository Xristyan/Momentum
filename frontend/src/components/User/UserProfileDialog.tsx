'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Edit, Upload } from 'lucide-react';
import { useState, useEffect } from 'react';
import Image from 'next/image';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { FormField } from '../ui/form';
import clsx from 'clsx';
import { useUpdateUserProfile } from '@/hooks/userHooks/userHooks';
import { useUser } from '@/providers/userProvider/UserProvider';
import Avatar from 'boring-avatars';

// Simplified schema for the form
const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
});

type UserProfileDialogProps = {
  trigger?: React.ReactNode;
};

// Helper function to check if a URL is a Cloudinary URL
const isCloudinaryUrl = (url: string | null): boolean => {
  if (!url) return false;
  return url.includes('cloudinary.com') || url.includes('res.cloudinary.com');
};

export const UserProfileDialog = ({ trigger }: UserProfileDialogProps) => {
  const [open, setOpen] = useState(false);
  const { updateProfile, isPending } = useUpdateUserProfile();
  const { user } = useUser();
  const userData = user?.data ?? null;

  // Create a separate state for the picture
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [isPictureLoading, setIsPictureLoading] = useState(false);
  // Add a key to force remounting and avoid hydration issues
  const [pictureKey, setPictureKey] = useState(0);
  // Add state to track image loading errors
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    // Set profile picture from user data when available
    if (userData?.picture) {
      setProfilePicture(userData.picture);
      // Update the key when the picture changes to force remounting
      setPictureKey((prev) => prev + 1);
      // Reset image error state
      setImageError(false);
    }
  }, [userData?.picture]);

  // Reset picture state when dialog closes
  useEffect(() => {
    if (!open) {
      // When dialog closes, reset to user data
      if (userData?.picture) {
        setProfilePicture(userData.picture);
      }
      // Reset loading state
      setIsPictureLoading(false);
    }
  }, [open, userData?.picture]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: userData?.name || '',
    },
  });

  useEffect(() => {
    // Update form when dialog opens
    if (open && userData) {
      form.reset({
        name: userData.name || '',
      });
    }
  }, [open, userData, form]);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    // Combine form data with profile picture
    const submitData = {
      ...data,
      picture: profilePicture || undefined,
    };

    updateProfile(submitData, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  };

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    // Check file size (1MB max)
    if (file.size > 1024 * 1024) {
      alert('File size must be less than 1MB');
      return;
    }

    // Show loading state while processing the image
    setIsPictureLoading(true);

    // Read file as data URL
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setProfilePicture(result);
      setIsPictureLoading(false);
    };
    reader.onerror = () => {
      alert('Error reading file');
      setIsPictureLoading(false);
    };
    reader.readAsDataURL(file);
  };

  // Handle drag events
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];

      // Check file type
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }

      // Check file size (1MB max)
      if (file.size > 1024 * 1024) {
        alert('File size must be less than 1MB');
        return;
      }

      // Show loading state while processing the image
      setIsPictureLoading(true);

      // Read file as data URL
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setProfilePicture(result);
        setIsPictureLoading(false);
      };
      reader.onerror = () => {
        alert('Error reading file');
        setIsPictureLoading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        setOpen(newOpen);
      }}
    >
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm" className="gap-1">
            <Edit className="h-4 w-4" />
            Edit Profile
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Update your profile information below.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div className="flex flex-col items-center justify-center space-y-3">
              <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-gray-200 dark:border-gray-700">
                {profilePicture && !imageError ? (
                  <Image
                    key={`profile-picture-${pictureKey}`}
                    src={profilePicture}
                    alt="Profile picture"
                    fill
                    sizes="96px"
                    className="object-cover"
                    priority
                    onError={() => setImageError(true)}
                  />
                ) : userData?.email ? (
                  <Avatar
                    key={`avatar-${pictureKey}`}
                    size={96}
                    name={userData.email}
                    variant="beam"
                    colors={[
                      '#92A1C6',
                      '#146A7C',
                      '#F0AB3D',
                      '#C271B4',
                      '#C20D90',
                    ]}
                  />
                ) : null}
              </div>

              <div
                className="mt-2 flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-4 dark:border-gray-600"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  id="profileImage"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={isPictureLoading}
                />
                <label
                  htmlFor="profileImage"
                  className={`cursor-pointer ${isPictureLoading ? 'opacity-50' : ''}`}
                >
                  <div className="flex flex-col items-center">
                    {isPictureLoading ? (
                      <>
                        <div className="mb-2 h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-indigo-600"></div>
                        <span className="text-sm text-gray-500">
                          Uploading image...
                        </span>
                      </>
                    ) : (
                      <>
                        <Upload className="mb-1 h-6 w-6 text-gray-500" />
                        <span className="text-sm text-gray-500">
                          Drag or click to upload an image
                        </span>
                      </>
                    )}
                  </div>
                </label>
              </div>

              {userData?.picture && isCloudinaryUrl(userData.picture) && (
                <p className="mt-1 text-xs text-gray-500">
                  Your image is stored securely on Cloudinary
                </p>
              )}
            </div>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      className={clsx({
                        'border-red-500 focus-visible:ring-red-500':
                          form.formState.errors.name,
                      })}
                      placeholder="Enter your full name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              setOpen(false);
              form.reset();
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={form.handleSubmit(onSubmit)}
            disabled={isPending || isPictureLoading}
          >
            {isPending || isPictureLoading ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                {isPending ? 'Saving...' : 'Processing Image...'}
              </>
            ) : (
              'Save Changes'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
