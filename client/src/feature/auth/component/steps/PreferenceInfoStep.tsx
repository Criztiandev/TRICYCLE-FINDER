import React, { useEffect, useState } from "react";
import SelectField from "@/common/components/form/SelectField";
import { useFormContext } from "react-hook-form";
import { SelectOption } from "@/common/components/ui/Select";

const RunningPreferenceInfoStep = () => {
  return (
    <>
      <SelectField
        label="Preferred Distance"
        name="runnerPreferences.preferredDistance"
        placeholder="Select Distance"
        options={DistanceOptions}
      />

      <SelectField
        label="Preferred Pace"
        name="runnerPreferences.preferredPace"
        placeholder="Select pace"
        options={PaceOptions}
      />

      <SelectField
        label="Preferred Terrain"
        name="runnerPreferences.preferredTerrain"
        placeholder="Select terrain"
        options={TerrainOptions}
      />

      <SelectField
        label="Available Days"
        name="runnerPreferences.availableDays"
        placeholder="Select available days"
        options={DayOptions}
      />
    </>
  );
};

export default RunningPreferenceInfoStep;

const DistanceOptions: SelectOption[] = [
  { label: "1k (0.62 miles)", value: "1k" },
  { label: "2k (1.24 miles)", value: "2k" },
  { label: "3k (1.86 miles)", value: "3k" },
  { label: "5k (3.1 miles)", value: "5k" },
  { label: "10k (6.2 miles)", value: "10k" },
  { label: "Half Marathon (13.1 miles)", value: "half_marathon" },
  { label: "Marathon (26.2 miles)", value: "marathon" },
];

const PaceOptions: SelectOption[] = [
  { label: "Relax", value: "relax" },
  { label: "Easy", value: "easy" },
  { label: "Steady", value: "steady" },
  { label: "Moderate", value: "moderate" },
  { label: "Brisk", value: "brisk" },
  { label: "Fast", value: "fast" },
  { label: "Very fast", value: "very_fast" },
  { label: "Elite", value: "elite" },
];

const TerrainOptions: SelectOption[] = [
  { label: "Road", value: "road" },
  { label: "Trail", value: "trail" },
  { label: "Track", value: "track" },
  { label: "Hills", value: "hills" },
  { label: "Flat", value: "flat" },
  { label: "Mixed", value: "mixed" },
];

const DayOptions: SelectOption[] = [
  { label: "Monday", value: "monday" },
  { label: "Tuesday", value: "tuesday" },
  { label: "Wednesday", value: "wednesday" },
  { label: "Thursday", value: "thursday" },
  { label: "Friday", value: "friday" },
  { label: "Saturday", value: "saturday" },
  { label: "Sunday", value: "sunday" },
];
