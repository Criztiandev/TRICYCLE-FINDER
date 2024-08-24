import useFetch from "@/common/hooks/query/useFetch";
import { ProtectedAxios } from "@/lib/axios/instances";

const useBookingSession = (key: string) => {
  return useFetch({
    queryKey: [`booking-sessions-${key}`],
    queryFn: async () => {
      const { data } = await ProtectedAxios.get(`/booking/session`);
      const { payload } = data;
      return payload;
    },
  });
};

export default useBookingSession;
