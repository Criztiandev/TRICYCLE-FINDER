import useFetch from "@/common/hooks/query/useFetch";
import { ProtectedAxios } from "@/lib/axios/instances";

const useUserBookingDetails = (id: string) => {
  return useFetch({
    queryKey: [`booking-user-details-${id}`],
    queryFn: async () => {
      const { data: result } = await ProtectedAxios.get(
        `/booking/request/user/details/${id}`
      );
      return result.payload || [];
    },
  });
};

export default useUserBookingDetails;
