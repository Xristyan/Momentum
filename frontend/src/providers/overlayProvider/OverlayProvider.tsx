'use client';
import { createContext, FC, PropsWithChildren, useContext } from 'react';
import { useDisclouser } from '@/hooks/useDisclouser/useDisclouser';
const OverlayContext = createContext<unknown | null>(null);

export const OverlayProvider: FC<PropsWithChildren> = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclouser();

  return (
    <OverlayContext.Provider value={{ isOpen, onOpen, onClose }}>
      {children}
    </OverlayContext.Provider>
  );
};

export const useOverlay = () => {
  const context = useContext(OverlayContext);

  return context as {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
  };
};
