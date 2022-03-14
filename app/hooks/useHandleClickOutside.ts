import { RefObject, useEffect } from 'react';

const useHandleClickOutside = (ref: RefObject<any>, handler: (event: UIEvent) => void): void => {
  useEffect((): () => void => {
    const listener = (event: UIEvent): void => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      handler(event);
    };

    // document.addEventListener('mousedown', listener);
    // document.addEventListener('touchstart', listener);

    return (): void => {
      // document.removeEventListener('mousedown', listener);
      // document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};

export default useHandleClickOutside;
