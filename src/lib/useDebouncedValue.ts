"use client";

// Возвращает значение с задержкой: оно обновляется, только когда value не меняется delayMs миллисекунд.
// Нужно для поиска: запрос уходит, когда пользователь перестал печатать, а не на каждую букву.

import { useEffect, useState } from "react";

export function useDebouncedValue<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delayMs);
    // Если value изменилось раньше, чем прошла задержка, старый таймер отменяется.
    return () => clearTimeout(timer);
  }, [value, delayMs]);

  return debounced;
}
