'use client';
import { useState } from 'react';

import { useCallback } from 'react';

const useDisclouser = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return { isOpen, onOpen, onClose, setIsOpen };
};

export { useDisclouser };
