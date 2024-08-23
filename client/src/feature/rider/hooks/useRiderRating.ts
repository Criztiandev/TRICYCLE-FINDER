import useMutate from "@/common/hooks/query/useMutate";
import { ProtectedAxios } from "@/lib/axios/instances";
import { useForm } from "react-hook-form";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";

const useRateRider = (riderID: string) => {
  const form = useForm();
  const mutation = useMutate({
    mutationKey: [`rider-rate-${riderID}`],
    mutationFn: async (value) =>
      await ProtectedAxios.post(`/booking/rider/rate/${riderID}`, value),

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
