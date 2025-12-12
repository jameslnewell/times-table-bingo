import { useState, useEffect } from "react";

export function useLocalStorage<T>(
  key: string,
  defaultValue: T
): [T, (value: T) => void] {
  const [value, setValue] = useState<T>(defaultValue);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setValue(JSON.parse(item));
      }
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error);
    }
    setIsInitialized(true);
  }, [key]);

  // Save to localStorage when value changes
  useEffect(() => {
    if (isInitialized) {
      try {
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error(`Error saving ${key} to localStorage:`, error);
      }
    }
  }, [key, value, isInitialized]);

  return [value, setValue];
}
