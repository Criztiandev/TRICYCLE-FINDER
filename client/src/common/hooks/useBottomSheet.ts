import { View, Text } from "react-native";
import React, { useRef } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

const useBottomSheet = () => {
  const currentRef = useRef<BottomSheetModal | null>(null);
  const openSheet = () => {
    if (currentRef.current) {
    }
  };
  const closeSheet = () => {};

  return { currentRef, openSheet, closeSheet };
};

export default useBottomSheet;
