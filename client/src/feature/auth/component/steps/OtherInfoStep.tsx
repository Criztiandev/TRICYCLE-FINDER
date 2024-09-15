import InputField from "@/common/components/form/InputField";
import SelectField from "@/common/components/form/SelectField";
import React from "react";

const OtherInfoStep = () => {
  return (
    <>
      <InputField
        label="Course"
        name="course"
        placeholder="Enter your course"
      />

      <InputField
        label="Department"
        name="department"
        placeholder="Enter your department"
      />
    </>
  );
};

export default OtherInfoStep;
