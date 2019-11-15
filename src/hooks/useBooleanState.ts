import { useState, useCallback } from 'react';

const useBooleanState = (
  initialState = false,
): [boolean, () => void, () => void] => {
  const [isOpen, setIsOpen] = useState<boolean>(initialState);

  const open = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const close = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return [isOpen, open, close];
};

export default useBooleanState;
