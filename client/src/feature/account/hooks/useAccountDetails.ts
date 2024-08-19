import { ProtectedAxios } from "@/lib/axios/instances";
import useFetch from "@/common/hooks/query/useFetch";

const useAccountDetails = (id?: string) => {
  return useFetch({
    queryKey: [`account-details-${id}`],
    queryFn: async () => {
      const { data } = await ProtectedAxios.get(`/account/${id}`);
      const { payload } = data;
      return payload;
    },
  });
};

export default useAccountDetails;
