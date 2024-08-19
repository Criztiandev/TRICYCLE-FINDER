import React from "react";
import InputField from "@/common/components/form/InputField";
import SelectField from "@/common/components/form/SelectField";
import DatePickerField from "@/common/components/form/DatePickerField";

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

      <DatePickerField name="dateOfBirth" label="Birth Date" />

      <SelectField
        label="Gender"
        name="gender"
        placeholder="Select Gender"
        options={[
          { label: "Male", value: "male" },
          { label: "Female", value: "female" },
          { label: "preferred not to say", value: "other" },
        ]}
      />
    </>
  );
};

export default PersonalInfoStep;
