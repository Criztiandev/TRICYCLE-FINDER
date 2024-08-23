import useFetch from "@/common/hooks/query/useFetch";
import { ProtectedAxios } from "@/lib/axios/instances";

const useRiderRequestList = () => {
  const query = useFetch({
    queryKey: ["rider-request-list"],
    queryFn: async () => {
      const { data: result } = await ProtectedAxios.get("/rider/request/all");

      return result.payload;
    },
  });

  return { ...query };
};

export default useRiderRequestList;
