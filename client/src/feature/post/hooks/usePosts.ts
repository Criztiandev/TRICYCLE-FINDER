import { ProtectedAxios } from "@/lib/axios/instances";
import useFetch from "@/common/hooks/query/useFetch";
import useScreenFocus from "@/common/hooks/utils/useScreenFocus";

const usePosts = () => {
  const { isFocused } = useScreenFocus();
  return useFetch({
    queryKey: ["user-post"],
    queryFn: async () => {
      const { data } = await ProtectedAxios.get("/post/all");
      const { payload } = data;
      return payload;
    },
    enabled: isFocused,
  });
};

export default usePosts;
