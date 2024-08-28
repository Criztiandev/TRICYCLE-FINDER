import { ProtectedAxios } from "@/lib/axios/instances";
import useFetch from "@/common/hooks/query/useFetch";

const useViewAccountDetails = (id?: string) => {
  return useFetch({
    queryKey: [`account-view-details-${id}`],
    queryFn: async () => {
      const { data } = await ProtectedAxios.get(`/account/details/view/${id}`);
      const { payload } = data;
      return payload;
    },
  });
};

export default useViewAccountDetails;
