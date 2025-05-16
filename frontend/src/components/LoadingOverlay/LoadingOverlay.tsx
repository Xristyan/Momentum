'use client';
import { useOverlay } from '@/providers/overlayProvider/OverlayProvider';

export const LoadingOverlay = () => {
  const { isOpen } = useOverlay();
  return (
    <>
      {' '}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/70">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent"></div>
          <p className="mt-4 text-lg font-medium text-white">Logging out...</p>
        </div>
      )}
    </>
  );
};
