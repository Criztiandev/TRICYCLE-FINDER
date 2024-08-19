import { View, Text } from "react-native";
import React, { useCallback, useMemo, useState } from "react";

interface Props<T> {
  payload: T[];
  keys: (keyof T)[];
}

const useArraySearch = <T>({ payload, keys }: Props<T>) => {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredArray = useMemo(() => {
    if (!searchTerm) return;

    return payload.filter((item) => {
      return keys.some((key) => {
        const fieldValue = item[key];
        if (typeof fieldValue === "string" || typeof fieldValue === "number") {
          return String(fieldValue)
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        }
        return false;
      });
    });
  }, [payload, keys, searchTerm]);

  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  return {
    filteredArray,
    searchTerm,
    handleSearch,
  };
};

export default useArraySearch;
