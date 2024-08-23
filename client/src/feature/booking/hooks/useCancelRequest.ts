import useMutate from "@/common/hooks/query/useMutate";
import { ProtectedAxios } from "@/lib/axios/instances";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";

const useCancelRequest = (id: string) => {
  const router = useRouter();
  const mutation = useMutate({
    queryKey: `account-details-${id}`,
    mutationKey: [`booking-request-${id}`],
    mutationFn: async () =>
      await ProtectedAxios.patch(`/booking/request/cancel/${id}`),

    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Cancel Successfully",
      });
    },

    onError: () => {
      router.back();
    },
  });
  return { mutation };
};

export default useCancelRequest;
