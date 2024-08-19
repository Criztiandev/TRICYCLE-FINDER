import { View, Text } from "react-native";
import useFetch from "@/common/hooks/query/useFetch";
import { ProtectedAxios } from "@/lib/axios/instances";

const useFriendRequestSent = () => {
  return useFetch({
    queryKey: ["friend-requests"],
    queryFn: async () => {
      const { data } = await ProtectedAxios.get("/friend/sent-request");

      return data?.payload;
    },
  });
};

export default useFriendRequestSent;
