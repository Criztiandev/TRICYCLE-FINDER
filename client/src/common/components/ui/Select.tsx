import { View, Text } from "react-native";
import React, { FC } from "react";
import { cn } from "@/lib/utils";
import {
  Picker,
  PickerItemProps,
  PickerProps,
} from "@react-native-picker/picker";
import useFetch from "@/common/hooks/query/useFetch";
import { PublicAxios } from "@/lib/axios/instances";
import LoadingScreen from "@/layout/screen/LoadingScreen";
import ErrorScreen from "@/layout/screen/ErrorScreen";

export interface SelectOption extends PickerItemProps {
  disabled?: boolean;
}

export interface SelectProps extends PickerProps {
  label?: string;
  textClassName?: string;
  options: SelectOption[];
  optional?: boolean;
  containerClass?: string;
  placeholder?: string;
  disabled?: boolean;
}

const BaseSelect: FC<SelectProps> = ({
  label,
  optional,
  options,
  placeholder,
  ...props
}) => {
  return (
    <View className="">
      {label && (
        <Text
          className={cn(
            "text-base capitalize font-bold mb-2",
            props.textClassName
          )}
        >
          {label} {optional && <Text className="text-red-500">*</Text>}
        </Text>
      )}

      <View
        style={{
          borderWidth: 3,
          borderColor: "#179151",
          borderRadius: 10,
        }}
      >
        <Picker {...props} enabled={!props.disabled}>
          {placeholder && (
            <Picker.Item color="gray" value="" label={placeholder} />
          )}
          {options.map((option) => (
            <Picker.Item
              key={option.value}
              {...option}
              enabled={option.disabled}
              color={option.disabled ? "gray" : ""}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
};

export default BaseSelect;
