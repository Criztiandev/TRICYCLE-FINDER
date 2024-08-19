import { ProtectedAxios } from "@/lib/axios/instances";
import useFetch from "@/common/hooks/query/useFetch";

const useProfile = () => {
  return useFetch({
    queryKey: ["user-details"],
    queryFn: async () => {
      const { data } = await ProtectedAxios.get("/account/profile");
      const { payload } = data;
      return payload;
    },
  });
};

export default useProfile;
