import useFetch from "@/common/hooks/query/useFetch";
import { ProtectedAxios } from "@/lib/axios/instances";
import useMutate from "@/common/hooks/query/useMutate";
import Toast from "react-native-toast-message";

const useAcceptFriendRequest = (id?: string, key?: string) => {
  return useMutate({
    queryKey: key,
    mutationKey: [`accept-friend-request-${id}`],
    mutationFn: async () =>
      await ProtectedAxios.patch(`/friend/request/accept/${id}`),
    onSuccess: () => {},
  });
};

export default useAcceptFriendRequest;
