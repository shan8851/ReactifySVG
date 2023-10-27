import { useEffect, useState } from 'react';

function useDebounce<T>(value: T, delay: number, cb?: (value: T) => void): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    if (value === debouncedValue) return () => {
      // early return
    };
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
      if (cb) cb(value);
    }, delay);
    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay, debouncedValue, cb]);

  return debouncedValue;
}

export default useDebounce;
