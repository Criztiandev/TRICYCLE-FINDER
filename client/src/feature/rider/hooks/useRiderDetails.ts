import useFetch from "@/common/hooks/query/useFetch";
import { ProtectedAxios } from "@/lib/axios/instances";

const useRiderDetails = (riderID: string) => {
  return useFetch({
    queryKey: [`rider-details-${riderID}`],
    queryFn: async () => {
      const { data: result } = await ProtectedAxios.get(
        `/booking/rider/details/${riderID}`
      );
      return result.payload;
    },
  });
};

export default useRiderDetails;
