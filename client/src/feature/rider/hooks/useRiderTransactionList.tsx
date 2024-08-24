import useFetch from "@/common/hooks/query/useFetch";
import { ProtectedAxios } from "@/lib/axios/instances";

const useRiderTransactionList = () => {
  const query = useFetch({
    queryKey: ["rider-transaction-list"],
    queryFn: async () => {
      const { data: result } = await ProtectedAxios.get(
        "/rider/transaction/all"
      );

      return result.payload;
    },
  });

  return { ...query };
};

export default useRiderTransactionList;
