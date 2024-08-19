import { ReactNode, useState } from "react";

const useMultiForm = (elements: ReactNode[]) => {
  const [stepIndex, setStepIndex] = useState<number>(0);

  const nextStep = () =>
    setStepIndex((prev) => (prev >= elements.length - 1 ? prev : (prev += 1)));
  const prevStep = () =>
    setStepIndex((prev) => (prev <= 0 ? prev : (prev -= 1)));
  const gotoStep = (index: number) => setStepIndex(index);

  return {
    currentStep: stepIndex,
    element: elements[stepIndex],
    isFistStep: stepIndex === 0,
    isLastStep: stepIndex === elements.length - 1,
    nextStep,
    prevStep,
    gotoStep,
  };
};

export default useMultiForm;
