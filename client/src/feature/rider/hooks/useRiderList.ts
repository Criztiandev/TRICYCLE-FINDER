import useFetch from "@/common/hooks/query/useFetch";
import { ProtectedAxios } from "@/lib/axios/instances";

const useRiderList = () => {
  const query = useFetch({
    queryKey: ["rider-list"],
    queryFn: async () => {
      const { data: result } = await ProtectedAxios.get("/rider/all/active");

      return result.payload;
    },
  });

  return { ...query };
};

export default useRiderList;
