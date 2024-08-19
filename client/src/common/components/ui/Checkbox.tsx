import React, { FC, useState } from "react";
import { View } from "react-native";
import BaseCheckbox, {
  CheckboxProps as BaseCheckboxProps,
} from "expo-checkbox";
import { cn } from "@/lib/utils";
import Label from "./Label";

export interface CheckboxProps extends BaseCheckboxProps {
  className?: string;
  label?: string;
  labelClassName?: string;
  dir?: "left" | "right";
}

const Checkbox: FC<CheckboxProps> = ({
  dir = "right",
  className,
  label,
  labelClassName,
  ...props
}) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <View className={cn("flex-row items-center space-x-2", className)}>
      {dir === "left" && label && (
        <Label className={cn("", labelClassName)}>{label}</Label>
      )}
      <BaseCheckbox {...props} />
      {dir === "right" && label && (
        <Label className={cn("", labelClassName)}>{label}</Label>
      )}
    </View>
  );
};

export default Checkbox;
