import useFetch from "@/common/hooks/query/useFetch";
import { ProtectedAxios } from "@/lib/axios/instances";

const useBookingDetailsThruRequest = (id: string) => {
  return useFetch({
    queryKey: [`booking-details-${id}`],
    queryFn: async () => {
      const { data: result } = await ProtectedAxios.get(
        `/booking/request/${id}`
      );
      return result.payload || [];
    },
  });
};

export default useBookingDetailsThruRequest;
