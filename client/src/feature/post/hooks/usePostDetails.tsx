import { useQuery } from "@tanstack/react-query";
import { ProtectedAxios } from "@/lib/axios/instances";
import useFetch from "@/common/hooks/query/useFetch";

const usePostDetails = (id: string) => {
  const query = useFetch({
    queryKey: [`user-post-${id}`],
    queryFn: async () => {
      const { data } = await ProtectedAxios.get(`/post/${id}`);
      const { payload } = data;
      return payload;
    },
  });

  return query;
};

export default usePostDetails;
