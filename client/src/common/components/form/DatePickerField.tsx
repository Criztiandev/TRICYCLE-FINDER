import React, { FC, useState } from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useController, UseControllerProps } from "react-hook-form";
import { cn } from "@/lib/utils";
import moment from "moment-timezone";
import BaseInput from "../ui/Input";
import DateInput from "../ui/DateInput";

interface DatePickerFieldProps extends UseControllerProps {
  label: string;
  className?: string;
  timezone?: string;
}

const DatePickerField: FC<DatePickerFieldProps> = ({
  label,
  className,
  name,
  control,
  rules,
  timezone = moment.tz.guess(),
}) => {
  const [show, setShow] = useState(false);
  const {
    field,
    fieldState: { error },
  } = useController({ name, control, rules });

  const onChange = (event: any, selectedDate?: Date) => {
    setShow(Platform.OS === "ios");
    if (selectedDate) {
      const dateInTimezone = moment(selectedDate).tz(timezone);
      field.onChange(dateInTimezone.toDate());
    }
  };

  const showDatepicker = () => {
    setShow(true);
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return moment(date).tz(timezone).format("MMMM D, YYYY");
  };

  return (
    <View className={cn("mb-4 w-full", className)}>
      <TouchableOpacity onPress={showDatepicker}>
        <DateInput
          label="Birth date"
          containerClass={error?.message && "border-error focus:border-error"}
        >
          {formatDate(field.value) ? (
            <Text className="text-black">{formatDate(field.value)}</Text>
          ) : (
            <Text className="text-gray-500">mm/dd/yy</Text>
          )}
        </DateInput>
      </TouchableOpacity>

      {error && (
        <Text className="mt-1 text-sm text-red-500">{error.message}</Text>
      )}
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={field.value || new Date()}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default DatePickerField;
