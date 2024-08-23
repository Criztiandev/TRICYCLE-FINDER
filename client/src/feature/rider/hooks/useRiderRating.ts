import useMutate from "@/common/hooks/query/useMutate";
import { ProtectedAxios } from "@/lib/axios/instances";
import { useForm } from "react-hook-form";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";

const useRateRider = (riderID: string) => {
  const form = useForm();
  const mutation = useMutate({
    mutationKey: [`rider-rate-${riderID}`],
    mutationFn: async () => await ProtectedAxios.patch("/booking/rider/rate"),

    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Rated Successfully",
      });

      form.reset();
    },
  });
  return { form, mutation };
};

export default useRateRider;
