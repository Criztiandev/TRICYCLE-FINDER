import { View, ViewProps } from "react-native";
import React, { FC } from "react";
import { cn } from "@/lib/utils";

interface Props extends ViewProps {}

const XStack: FC<Props> = ({ children, ...props }) => {
  return (
    <View {...props} className={cn("flex flex-row ", props.className)}>
      {children}
    </View>
  );
};

export default XStack;
