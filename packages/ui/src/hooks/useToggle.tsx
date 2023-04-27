import { useCallback, useState } from 'react';

const useToggle = (initialValue = false) => {
  const [isOpen, setIsOpen] = useState(initialValue);

  const handleOpen = useCallback(() => setIsOpen(true), []);
  const handleClose = useCallback(() => setIsOpen(false), []);
  const handleToggle = useCallback(() => {
    isOpen ? handleClose() : handleOpen();
  }, [isOpen, handleOpen, handleClose]);

  return {
    isOpen, handleOpen, handleClose, handleToggle,
  };
};

export default useToggle;
