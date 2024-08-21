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

// Defining the interface for the props
interface Props extends Omit<BottomSheetModalProps, "snapPoints"> {
  className?: string;
  children: ReactNode;
  snapPoints?: string[];
}

// Creating the BottomSheet component
const BottomSheet = forwardRef<BottomSheetModal, Props>(
  ({ onChange, className, children, snapPoints = ["50%"], ...rest }, ref) => {
    // Callback for rendering the backdrop
    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
        />
      ),
      []
    );

    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        onChange={onChange}
        {...rest}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, ...rest }}>{children}</View>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </BottomSheetModal>
    );
  }
);

BottomSheet.displayName = "BottomSheet";

export default BottomSheet;
