import { View, Text } from "react-native";
import React, { FC } from "react";
import BaseInput, { InputProps } from "../ui/Input";
import { useFormContext, Controller, FieldError } from "react-hook-form";
import { cn } from "@/lib/utils";

interface Props extends InputProps {
  name: string;
}

const InputField: FC<Props> = ({ className, ...props }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <View className={cn(" w-full mb-2", className)}>
      <Controller
        control={control}
        name={props.name}
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <BaseInput
            {...props}
            onChangeText={onChange}
            value={value}
            className={errors[props.name] && "border-error focus:border-error"}
          />
        )}
      />
      {errors[props.name] && (
        <Text className="text-error">
          {(errors[props.name] as FieldError)?.message}
        </Text>
      )}
    </View>
  );
};

export default InputField;
