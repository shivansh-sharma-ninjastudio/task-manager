export const getFromStorage = (key: string) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch {
    return null;
  }
};

export const setToStorage = (key: string, value: unknown): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    console.error("Error saving to localStorage");
  }
};

export const removeFromStorage = (key: string): void => {
  localStorage.removeItem(key);
};
