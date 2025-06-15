'use client';

import { useUser } from '@/providers/userProvider/UserProvider';
import Image from 'next/image';
import { Star } from 'lucide-react';
import Avatar from 'boring-avatars';

interface UserProfileCardProps {
  organizationId?: number;
  className?: string;
}

export const UserProfileCard = ({
  organizationId,
  className = '',
}: UserProfileCardProps) => {
  const { user } = useUser();

  if (!user?.data) {
    return null;
  }

  const userData = user.data;

  const currentMembership = userData.Organizations?.find(
    (org) => org.id === Number(organizationId),
  )?.Membership;

  const currentXP = currentMembership?.xp || 0;

  // Calculate level (every 100 XP = 1 level)
  const level = Math.floor(currentXP / 100);
  const nextLevelXP = (level + 1) * 100;
  const xpToNextLevel = nextLevelXP - currentXP;

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Profile Image */}
      <div className="relative">
        <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-gray-200 dark:border-gray-600">
          {userData.picture ? (
            <Image
              src={userData.picture}
              alt={userData.name || userData.email}
              width={40}
              height={40}
              className="h-full w-full object-cover"
            />
          ) : (
            <Avatar
              size={40}
              name={userData.name || userData.email}
              variant="marble"
              colors={['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']}
            />
          )}
        </div>

        {/* Level Badge */}
        <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border border-white bg-blue-600 text-xs font-bold text-white">
          {level}
        </div>
      </div>

      {/* User Info */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center space-x-2">
          <h3 className="truncate text-sm font-medium text-gray-900 dark:text-white">
            {userData.name || 'User'}
          </h3>
        </div>

        <div className="flex items-center space-x-2">
          <Star className="h-3 w-3 text-blue-600" />
          <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
            {currentXP} XP
          </span>
          <span className="text-xs text-gray-500">
            • {xpToNextLevel} to level {level + 1}
          </span>
        </div>

        {/* Compact Progress Bar */}
        <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500 ease-out"
            style={{ width: `${currentXP % 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};
