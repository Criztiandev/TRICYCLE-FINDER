import { View, Text } from "react-native";
import useFetch from "@/common/hooks/query/useFetch";
import { ProtectedAxios } from "@/lib/axios/instances";

const useFriendRequest = () => {
  return useFetch({
    queryKey: ["friend-requests"],
    queryFn: async () => {
      const { data } = await ProtectedAxios.get("/friend/request");
      return data?.payload;
    },
  });
};

export default useFriendRequest;
