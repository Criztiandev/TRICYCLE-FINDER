import React, { useEffect, useState } from "react";
import SelectField from "@/common/components/form/SelectField";
import { useFormContext } from "react-hook-form";
import { SelectOption } from "@/common/components/ui/Select";

const DatingPreferenceInfoStep = () => {
  return (
    <>
      <SelectField
        label="Interest"
        name="datingPreferences.interestedIn"
        placeholder="Select interest"
        options={InterestOption}
      />

      <SelectField
        label="Age Rage"
        name="datingPreferences.ageRange"
        placeholder="Select ageRange"
        options={ageRange}
      />
    </>
  );
};

export default DatingPreferenceInfoStep;

const InterestOption: SelectOption[] = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
];

const ageRange: SelectOption[] = [
  { label: "18-22", value: "18-22" },
  { label: "23-27", value: "23-27" },
  { label: "28-32", value: "28-32" },
  { label: "33-37", value: "33-37" },
  { label: "38-42", value: "38-42" },
  { label: "43-47", value: "43-47" },
  { label: "48-52", value: "48-52" },
  { label: "53-57", value: "53-57" },
  { label: "58-62", value: "58-62" },
  { label: "63-67", value: "63-67" },
  { label: "68+", value: "68+" },
];
