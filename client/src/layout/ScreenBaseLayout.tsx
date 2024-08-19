import { cn } from "@/lib/utils";
import React, { FC, ReactNode, Suspense } from "react";
import {
  SafeAreaView,
  StatusBar,
  View,
  Platform,
  KeyboardAvoidingView,
} from "react-native";

interface Props {
  children?: ReactNode;
  className?: string;
}

const ScreenBaseLayout: FC<Props> = ({ children, ...props }) => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View className={cn("flex-1", props.className)}>{children}</View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ScreenBaseLayout;
