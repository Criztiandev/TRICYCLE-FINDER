import { View, Text } from "react-native";
import React, { FC } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { cn } from "@/lib/utils";
import BaseCheckbox, { CheckboxProps } from "@/common/components/ui/Checkbox";

interface Props extends CheckboxProps {
  name: string;
}

const CheckboxField: FC<Props> = ({ className, ...props }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <Controller
        control={control}
        name={props.name}
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <BaseCheckbox
            {...props}
            value={value}
            onValueChange={(value) => onChange(value)}
          />
        )}
      />
      {errors[props.name] && <Text>This is required.</Text>}
    </>
  );
};

export default CheckboxField;
