import { View, Text } from "react-native";
import React, { FC } from "react";
import { useFormContext, Controller, FieldError } from "react-hook-form";
import { cn } from "@/lib/utils";
import Select, { SelectOption, SelectProps } from "../ui/Select";

interface Props extends Omit<SelectProps, "options"> {
  name: string;
  options: SelectOption[];
}

const SelectField: FC<Props> = ({
  className,
  placeholder,
  options,
  ...props
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <View className={cn("mb-4 w-full", className)}>
      <Controller
        control={control}
        name={props.name}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Select
            {...props}
            options={options}
            selectedValue={value}
            onValueChange={(itemValue: any) => {
              onChange(itemValue === "" ? null : itemValue);
            }}
            onBlur={onBlur}
            placeholder={placeholder}
            containerClass={cn(
              props.containerClass,
              errors[props.name] && "border-error focus:border-error"
            )}
          />
        )}
      />
      {errors[props.name] && (
        <Text className="text-red-500">
          {(errors[props.name] as FieldError)?.message}
        </Text>
      )}
    </View>
  );
};

export default SelectField;
