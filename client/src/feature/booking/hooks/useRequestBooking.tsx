import useMutate from "@/common/hooks/query/useMutate";
import { ProtectedAxios } from "@/lib/axios/instances";
import { useForm } from "react-hook-form";
import { IBooking } from "../interface/booking.interface";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";

const useRequestBooking = (id: string) => {
  const router = useRouter();
  const form = useForm<IBooking, "dropoffLocation" | "pickupLocation">();
  const mutation = useMutate({
    queryKey: `account-details-${id}`,
    mutationKey: [`booking-request-${id}`],
    mutationFn: async (
      value: Pick<IBooking, "dropoffLocation" | "pickupLocation">
    ) =>
      await ProtectedAxios.post("/booking/request", {
        riderID: id,
        ...value,
      }),

    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Booked Successfully",
      });

      form.reset();
    },
  });
  return { form, mutation };
};

export default useRequestBooking;
