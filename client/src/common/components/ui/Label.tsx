import { View, Text, TextProps } from "react-native";
import React, { FC } from "react";
import { cn } from "@/lib/utils";

interface Props extends TextProps {}

const Label: FC<Props> = ({ children, className, ...props }) => {
  return (
    <Text {...props} className={cn("text-base", className)}>
      {children}
    </Text>
  );
};

export default Label;
