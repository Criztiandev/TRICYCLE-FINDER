import { View, Text } from "react-native";
import React from "react";
import useMutate from "@/common/hooks/query/useMutate";
import { ProtectedAxios } from "@/lib/axios/instances";
import { useForm } from "react-hook-form";
import { IBooking } from "../interface/booking.interface";
import Toast from "react-native-toast-message";

interface RequestValue
  extends Pick<IBooking, "dropoffLocation" | "pickupLocation"> {}

const useBookingRequest = () => {
  /**
   * This is a hook that lets you handle request to the rider that you want to book with
   * @param riderID - Id of the rider that we want to request
   * @returns
   */
  const requestMutation = (riderID: string) => {
    const form = useForm<RequestValue>({
      defaultValues: {
        dropoffLocation: "",
        pickupLocation: "",
      },
    });

    const onRequest = (value: RequestValue) => {
      mutate.mutate(value);
    };

    const mutate = useMutate({
      queryKey: `rider-details-${riderID}`,
      mutationKey: [`booking-request-${riderID}`],
      mutationFn: async (value: RequestValue) =>
        await ProtectedAxios.post(`/booking/request/create/${riderID}`, value),

      onSuccess: () => {
        Toast.show({
          type: "success",
          text1: "Booked Successfully",
        });

        form.reset();
      },
    });

    return { form, onRequest, ...mutate };
  };

  /**
   *
   * @param bookingID
   * @returns
   */
  const cancelMutation = (riderID: string, optKey?: string) => {
    const onCancel = () => {
      mutate.mutate(riderID);
    };

    const mutate = useMutate({
      queryKey: `rider-details-${optKey}`,
      mutationKey: [`booking-cancel-${riderID}`],
      mutationFn: async () =>
        await ProtectedAxios.patch(`/booking/request/cancel/${riderID}`),

      onSuccess: () => {
        Toast.show({
          type: "success",
          text1: "Cancelled Successfully",
        });
      },
    });

    return { onCancel, ...mutate };
  };

  /**
   *
   * @param bookingID
   * @returns
   */
  const acceptMutation = (bookingID: string) => {
    return useMutate({
      mutationKey: [`booking-accept-${bookingID}`],
      mutationFn: async () =>
        await ProtectedAxios.patch(`/booking/request/accept/${bookingID}`),
    });
  };

  return {
    requestMutation,
    cancelMutation,
    acceptMutation,
  };
};

export default useBookingRequest;
