import { ReactNode } from "react";
import useMultiForm from "@/common/hooks/useMultiForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { StepValue } from "../interface/steps.interface";
import { PublicAxios } from "@/lib/axios/instances";
import { AxiosError, AxiosResponse } from "axios";
import { ErrorResponse } from "@/common/interface/error.interface";
import { AccountWithPreferenceValue } from "@/feature/account/interface/account.interface";
import Toast from "react-native-toast-message";
import { RegisterResponse } from "../interface/sign-up.interface";

interface Props {
  defaultValues: Record<string, any>;
  steps: StepValue[];
}

const useRegister = ({ steps }: Props) => {
  const multiform = useMultiForm(steps.map((item) => item.component));
  const form = useForm({
    resolver: zodResolver(steps[multiform.currentStep].validation),
  });
  // Mutation
  const mutation = useMutation<
    AxiosResponse<RegisterResponse>,
    AxiosError<ErrorResponse>,
    AccountWithPreferenceValue
  >({
    mutationFn: async (value) =>
      await PublicAxios.post("/auth/register", value),
    mutationKey: ["register-mutation"],

    onSuccess: ({ data }) => {
      const { message } = data;
      Toast.show({
        type: "success",
        text1: message || "Registered Successfully",
      });
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      console.log(error);
      if (error.response) {
        const { error: errorMessage } = error.response.data;
        Toast.show({
          type: "error",
          text1: errorMessage,
        });
      } else if (error.request) {
        Toast.show({
          type: "error",
          text1: error.request,
        });
      } else {
        Toast.show({
          type: "error",
          text1: error.message,
        });
      }
    },
  });

  return { multiform, form, mutation };
};

export default useRegister;
