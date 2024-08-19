import useFetch from "@/common/hooks/query/useFetch";
import { ProtectedAxios } from "@/lib/axios/instances";

const useFriendList = () => {
  return useFetch({
    queryKey: ["friends-list"],
    queryFn: async () => {
      const { data } = await ProtectedAxios.get("/friend/list");
      return data?.payload;
    },
  });
};

export default useFriendList;
