import { useState, useEffect } from 'react';
import { ScreenSize } from '~/types';

export const useScreenSize = (): ScreenSize => {
  const [screenSize, setScreenSize] = useState<ScreenSize>(() => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width < 767) return ScreenSize.MOBILE;
      if (width < 1080) return ScreenSize.TABLET;
      if (width < 1281) return ScreenSize.SMALL_DESKTOP;
      return ScreenSize.DESKTOP;
    }
    return ScreenSize.DESKTOP;
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 767) {
        setScreenSize(ScreenSize.MOBILE);
      } else if (width < 1080) {
        setScreenSize(ScreenSize.TABLET);
      } else {
        setScreenSize(ScreenSize.DESKTOP);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return screenSize;
};
