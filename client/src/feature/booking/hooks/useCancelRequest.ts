import useMutate from "@/common/hooks/query/useMutate";
import { ProtectedAxios } from "@/lib/axios/instances";
import { useForm } from "react-hook-form";
import { IBooking } from "../interface/booking.interface";
import Toast from "react-native-toast-message";

const useCancelRequest = (id: string) => {
  const mutation = useMutate({
    queryKey: `account-details-${id}`,
    mutationKey: [`booking-request-${id}`],
    mutationFn: async () =>
      await ProtectedAxios.delete(`/booking/request/cancel/${id}`),

    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Booked cancelled",
      });
    },
  });
  return { mutation };
};

export default useCancelRequest;
