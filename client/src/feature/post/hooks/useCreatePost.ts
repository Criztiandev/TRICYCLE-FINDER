import { useForm } from "react-hook-form";
import { ProtectedAxios } from "@/lib/axios/instances";
import Toast from "react-native-toast-message";
import { PostValue } from "../interface/post.interface";
import useMutate from "@/common/hooks/query/useMutate";

const useCreatePost = () => {
  const form = useForm();

  const mutation = useMutate({
    mutationKey: ["create-post"],
    queryKey: "user-post",
    mutationFn: async (value: PostValue) => {
      const { payload } = (await ProtectedAxios.post("/post/create", value))
        .data;
      return payload;
    },

    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Post Created Successfully",
      });
      form.reset();
    },
  });

  return { form, mutation };
};

export default useCreatePost;
