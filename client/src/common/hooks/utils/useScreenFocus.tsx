import React, { useCallback, useState } from "react";
import { useFocusEffect } from "expo-router";

const useScreenFocus = () => {
  const [isFocused, setIsFocused] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setIsFocused(true);

      return () => {
        setIsFocused(false);
      };
    }, [])
  );

  return { isFocused };
};

export default useScreenFocus;
