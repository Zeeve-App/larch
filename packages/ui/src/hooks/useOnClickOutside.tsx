import { RefObject, useEffect } from 'react';

const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: MouseEvent) => void,
): void => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOnClickOutside = (event: any) => {
    if (!ref.current || ref.current.contains(event.target)) {
      return;
    }
    handler(event);
  };

  useEffect(() => {
    document.addEventListener('click', handleOnClickOutside, true);
    return () => document.removeEventListener('click', handleOnClickOutside);
  }, [handler]);
};

export default useOnClickOutside;
