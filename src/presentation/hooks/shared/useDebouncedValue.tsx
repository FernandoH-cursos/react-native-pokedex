import { useEffect, useState } from 'react';

export const useDebouncedValue = (input: string = '',time: number = 500) => {
  const [debounced, setDebounced] = useState(input);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounced(input);
    }, time);

    //* Limpiar el timeout anterior
    return () => {
      clearTimeout(timeout);
    };
  }, [input, time]);

  return debounced;
}
