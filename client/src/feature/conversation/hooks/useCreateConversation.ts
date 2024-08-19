import useMutate from "@/common/hooks/query/useMutate";
import { ProtectedAxios } from "@/lib/axios/instances";
import { Href, useRouter } from "expo-router";

const useCreateConversation = (targetID: string) => {
  const router = useRouter();

  const mutation = useMutate({
    queryKey: `conversation-${targetID}`,
    mutationKey: [`conversation-${targetID}`],
    mutationFn: async () =>
      await ProtectedAxios.post(`/conversation/create/`, { targetID }),
    onSuccess: ({ data }) => {
      const { conversationID } = data?.payload;
      router.navigate(
        `/user/conversation/chat/${conversationID}` as Href<string>
      );
    },
  });

  return { mutation };
};

export default useCreateConversation;
