import AsyncStorage from "@react-native-async-storage/async-storage";

interface UseLocalStorageProps<T> {
  getItem: () => Promise<T | null>;
  setItem: (value: T) => Promise<void>;
  removeItem: () => Promise<void>;
  clear: () => Promise<void>;
}

function useLocalStorage<T>(key: string): UseLocalStorageProps<T> {
  const getItem = async (): Promise<T | null> => {
    try {
      const result = await AsyncStorage.getItem(key);
      return result ? JSON.parse(result) : null;
    } catch (e) {
      console.error(`Error retrieving item ${key} from AsyncStorage:`, e);
      return null;
    }
  };

  const setItem = async (value: T): Promise<void> => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      console.error(`Error setting item ${key} in AsyncStorage:`, e);
    }
  };

  const removeItem = async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      console.error(`Error removing item ${key} from AsyncStorage:`, e);
    }
  };

  const clear = async (): Promise<void> => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      console.error("Error clearing AsyncStorage:", e);
    }
  };

  return { getItem, setItem, removeItem, clear };
}

export default useLocalStorage;
