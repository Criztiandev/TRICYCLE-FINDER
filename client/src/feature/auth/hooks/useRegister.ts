import useMultiForm from "@/common/hooks/useMultiForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { StepValue } from "../interface/steps.interface";
import { PublicAxios } from "@/lib/axios/instances";
import Toast from "react-native-toast-message";
import useMutate from "@/common/hooks/query/useMutate";

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
  const mutation = useMutate({
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
  });

  return { multiform, form, mutation };
};

export default useRegister;
