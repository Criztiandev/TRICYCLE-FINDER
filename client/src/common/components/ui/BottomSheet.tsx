import React, { forwardRef, ReactNode, useCallback } from "react";
import {
  BottomSheetModal,
  BottomSheetModalProps,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  View,
} from "react-native";

interface Props extends Omit<BottomSheetModalProps, "children"> {
  className?: string;
  children: ReactNode;
}

const BottomSheet = forwardRef<BottomSheetModal, Props>(
  ({ onChange, className, children, snapPoints = ["50%"], ...rest }, ref) => {
    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          {...props}
        />
      ),
      []
    );

    return (
      <BottomSheetModal
        ref={ref}
        index={0}
        snapPoints={snapPoints}
        onChange={onChange}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        {...rest}
      >
        <View style={{ flex: 1 }}>{children}</View>
      </BottomSheetModal>
    );
  }
);

BottomSheet.displayName = "BottomSheet";

export default BottomSheet;
