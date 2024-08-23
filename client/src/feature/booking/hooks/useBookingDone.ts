import useMutate from "@/common/hooks/query/useMutate";
import { ProtectedAxios } from "@/lib/axios/instances";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";

const useBookingDone = (id: string) => {
  const router = useRouter();
  const mutation = useMutate({
    queryKey: `book-details-${id}`,
    mutationKey: [`booking-request-${id}`],
    mutationFn: async () =>
      await ProtectedAxios.patch(`/booking/request/done/${id}`),

    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Book is done",
      });

      setTimeout(() => {
        router.replace("/");
      }, 1000);
    },
  });
  return { mutation };
};

export default useBookingDone;
