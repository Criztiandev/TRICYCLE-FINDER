import useMutate from "@/common/hooks/query/useMutate";
import { ProtectedAxios } from "@/lib/axios/instances";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";
import { useQueryClient } from "@tanstack/react-query";

const useBookingDone = (userID: string, bookingID: string) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutate({
    queryKey: `booking-details-${userID}`,
    mutationKey: [`booking-request-${bookingID}`],
    mutationFn: async () =>
      await ProtectedAxios.patch(`/booking/request/done/${bookingID}`),

    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Book is done",
      });
      queryClient.clear();
      router.replace("/");
    },
  });
  return { mutation };
};

export default useBookingDone;
