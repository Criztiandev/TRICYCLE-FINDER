import useMutate from "@/common/hooks/query/useMutate";
import { ProtectedAxios } from "@/lib/axios/instances";
import Toast from "react-native-toast-message";

const useAcceptRequest = (userID: string, bookRequestID: string) => {
  const mutation = useMutate({
    queryKey: `booking-user-details-${userID}`,
    mutationKey: [`booking-request-${bookRequestID}`],
    mutationFn: async () =>
      await ProtectedAxios.patch(`/booking/request/accept/${bookRequestID}`),

    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Booked Successfully",
      });
    },
  });
  return { mutation };
};

export default useAcceptRequest;
