import useFetch from "@/common/hooks/query/useFetch";
import { ProtectedAxios } from "@/lib/axios/instances";
import useMutate from "@/common/hooks/query/useMutate";
import Toast from "react-native-toast-message";

const useCancelFriendRequest = (id?: string, key?: string) => {
  return useMutate({
    queryKey: key,
    mutationKey: [`cancel-friend-request-${id}`],
    mutationFn: async () =>
      await ProtectedAxios.patch(`/friend/request/cancel/${id}`),
    onSuccess: () => {},
  });
};

export default useCancelFriendRequest;
