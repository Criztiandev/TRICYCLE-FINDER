import { View, ViewProps } from "react-native";
import React, { FC } from "react";
import { cn } from "@/lib/utils";

interface Props extends ViewProps {}

const YStack: FC<Props> = ({ children, ...props }) => {
  return (
    <View {...props} className={cn("", props.className)}>
      {children}
    </View>
  );
};

export default YStack;
