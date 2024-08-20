import React from "react";
import InputField from "@/common/components/form/InputField";
import SelectField from "@/common/components/form/SelectField";
import DatePickerField from "@/common/components/form/DatePickerField";
import YStack from "@/common/components/stacks/YStack";
import { View } from "lucide-react-native";

const PersonalInfoStep = () => {
  return (
    <>
      <InputField
        label="First name"
        name="firstName"
        placeholder="Enter your First name"
      />

      <InputField
        label="Last name"
        name="lastName"
        placeholder="Enter your Last name"
      />
    </>
  );
};

export default PersonalInfoStep;
