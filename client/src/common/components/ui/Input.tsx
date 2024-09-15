import React, { FC, ReactNode, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TextInputProps,
} from "react-native";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react-native";

export interface InputProps extends Omit<TextInputProps, "className"> {
  type?: "default" | "password" | "tel" | "number" | "email";
  dir?: "left" | "right";
  label?: string;
  icon?: ReactNode;
  optional?: boolean;
  onPressIcon?: () => void;
  textClassName?: string;
  disabled?: boolean;
  className?: string;
}

const Input: FC<InputProps> = ({
  label,
  dir,
  onPressIcon,
  icon,
  optional,
  type = "default",
  className,
  style,
  textClassName,
  ...props
}) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const togglePasswordVisibility = () => setIsShowPassword(!isShowPassword);

  const inputTypeMap = {
    tel: "phone-pad",
    number: "numeric",
    email: "email-address",
    default: "default",
    password: "default",
  };

  const renderIcon = () => {
    if (type === "password") {
      return (
        <TouchableOpacity onPress={togglePasswordVisibility}>
          {isShowPassword ? (
            <EyeOff color="black" opacity={0.7} />
          ) : (
            <Eye color="black" opacity={0.7} />
          )}
        </TouchableOpacity>
      );
    }
    return icon ? (
      <TouchableOpacity onPress={onPressIcon}>{icon}</TouchableOpacity>
    ) : null;
  };

  return (
    <View className="w-full">
      {label && (
        <Text
          className={cn("text-base font-bold mb-2 capitalize", textClassName)}
        >
          {label} {optional && <Text className="text-error">*</Text>}
        </Text>
      )}
      <View
        className={cn(
          "flex-row items-center h-[52px] border-[3px] border-primary rounded-lg px-4 py-2 focus-within:border-primary-selected focus-within:border-2 "
        )}
        style={{
          borderRadius: 12,
        }}
      >
        {dir === "left" && renderIcon()}
        <TextInput
          {...props}
          className="flex-1 h-full"
          editable={!props.disabled}
          keyboardType={(inputTypeMap[type] as any) || "default"}
          secureTextEntry={type === "password" && !isShowPassword}
        />
        {dir === "right" && renderIcon()}
      </View>
    </View>
  );
};

export default Input;
