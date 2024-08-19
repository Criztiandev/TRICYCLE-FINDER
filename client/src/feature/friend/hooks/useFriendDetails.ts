import { View, Text } from "react-native";
import useFetch from "@/common/hooks/query/useFetch";
import { ProtectedAxios } from "@/lib/axios/instances";

const useFriendDetails = (id: string) => {
  return useFetch({
    queryKey: [`friend-details-${id}`],
    queryFn: async () => {
      const { data } = await ProtectedAxios.get(`/friend/details/${id}`);
      return data?.payload;
    },
  });
};

export default useFriendDetails;
