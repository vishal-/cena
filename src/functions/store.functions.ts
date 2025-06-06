/**
 * Save data to localStorage with a given key
 */
export const saveToStore = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};

/**
 * Retrieve data from localStorage by key
 * Returns null if key not found or on error
 */
export const getFromStore = <T>(key: string): T | null => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error("Error retrieving from localStorage:", error);
    return null;
  }
};

/**
 * Remove item from localStorage by key
 */
export const removeFromStore = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing from localStorage:", error);
  }
};

/**
 * Clear all data from localStorage
 */
export const clearStore = (): void => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error("Error clearing localStorage:", error);
  }
};
