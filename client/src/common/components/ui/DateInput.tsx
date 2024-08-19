import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TextInputProps,
  KeyboardTypeOptions,
} from "react-native";
import React, { FC, ReactNode, useState } from "react";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react-native";

export interface DateInputProps {
  type?: "default" | "password" | "tel" | "number" | "email";
  dir?: "left" | "right";
  label?: string;
  icon?: ReactNode;
  optional?: boolean;
  onPressIcon?: () => void;
  textClassName?: string;
  containerClass?: string;
  disabled?: boolean;
  className?: string;
  children?: ReactNode;
}

const DateInput: FC<DateInputProps> = ({
  label,
  dir,
  onPressIcon,
  icon,
  optional,
  type = "default",
  ...props
}) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setIsShowPassword(!isShowPassword);
  };

  const dateInputTypeMap: { [key: string]: KeyboardTypeOptions } = {
    tel: "phone-pad",
    number: "numeric",
    email: "email-address",
    default: "default",
    password: "default",
  };

  const renderIcon = () => {
    if (type === "password") {
      const attributes = { color: "black", opacity: 0.7 };
      return (
        <TouchableOpacity onPress={togglePasswordVisibility}>
          {isShowPassword ? (
            <EyeOff {...attributes} />
          ) : (
            <Eye {...attributes} />
          )}
        </TouchableOpacity>
      );
    }
    return icon ? (
      <TouchableOpacity onPress={onPressIcon}>{icon}</TouchableOpacity>
    ) : null;
  };

  return (
    <View>
      {label && (
        <Text
          className={cn(
            "text-base capitalize font-bold mb-2",
            props.textClassName
          )}
        >
          {label} {optional && <Text className="text-error">*</Text>}
        </Text>
      )}

      <View
        className={cn(
          "border h-[52px] rounded-md border-primary focus:border-primary-selected focus:border-2 flex-row items-center px-4 space-x-2",
          props.className
        )}
      >
        {dir === "left" && renderIcon()}
        {props.children}
        {dir === "right" && renderIcon()}
      </View>
    </View>
  );
};

export default DateInput;
