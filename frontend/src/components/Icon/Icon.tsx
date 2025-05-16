import Image from 'next/image';
import { FC } from 'react';

export const Icon: FC<{
  iconName: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}> = ({ iconName, alt, width, height, className }) => {
  const route = `/icons/${iconName}.svg`;
  return (
    <Image
      src={route}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
};
