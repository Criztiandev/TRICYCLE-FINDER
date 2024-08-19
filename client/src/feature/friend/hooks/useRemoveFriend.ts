import { View, Text } from "react-native";
import React, { useState } from "react";
import useMutate from "@/common/hooks/query/useMutate";
import { ProtectedAxios } from "@/lib/axios/instances";
import Toast from "react-native-toast-message";

const useRemoveFriend = (id?: string) => {
  return useMutate({
    queryKey: `account-details-${id}`,
    mutationKey: [`add-friend-${id}`],
    mutationFn: async () => await ProtectedAxios.delete(`/friend/remove/${id}`),

    onSuccess: () => {},
  });
};

export default useRemoveFriend;
