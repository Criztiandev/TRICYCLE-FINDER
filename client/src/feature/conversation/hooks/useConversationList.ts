import { View, Text } from "react-native";
import React from "react";
import useFetch from "@/common/hooks/query/useFetch";
import { ProtectedAxios } from "@/lib/axios/instances";

const useConversationList = () => {
  return useFetch({
    queryKey: ["user-conversations"],
    queryFn: async () => {
      const { data } = await ProtectedAxios.get("/conversation/user/all");
      return data?.payload;
    },
  });
};

export default useConversationList;
