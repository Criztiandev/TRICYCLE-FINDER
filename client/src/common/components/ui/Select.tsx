import { View, Text } from "react-native";
import React, { FC } from "react";
import { cn } from "@/lib/utils";
import {
  Picker,
  PickerItemProps,
  PickerProps,
} from "@react-native-picker/picker";

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
    <View>
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
        className={cn(
          "border h-[52px] w-full rounded-md border-primary focus:border-primary-selected focus:border-2 ",
          props.containerClass
        )}
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
