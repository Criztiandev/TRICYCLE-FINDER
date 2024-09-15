import React from "react";
import InputField from "@/common/components/form/InputField";

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
