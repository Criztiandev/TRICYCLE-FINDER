import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { ErrorResponse } from "@/common/interface/error.interface";
import { ProtectedAxios } from "@/lib/axios/instances";
import Toast from "react-native-toast-message";
import { ObjectId } from "mongoose";

const useLikePost = (id: string | ObjectId, providedKey?: string) => {
  const form = useForm();
  const queryClient = useQueryClient();

  const mutation = useMutation<
    AxiosResponse<any>,
    AxiosError<ErrorResponse>,
    any
  >({
    mutationKey: [`like-post-${id}`],
    mutationFn: async () => {
      const { payload } = (await ProtectedAxios.patch(`/post/like/${id}`)).data;
      return payload;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => {
          const queryKey = query.queryKey;

          if (queryKey[0] === providedKey) {
            return true;
          }
          return false;
        },
      });
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      if (error.response) {
        const { error: errorMessage } = error.response.data;
        Toast.show({
          type: "error",
          text1: errorMessage,
        });
      } else if (error.request) {
        Toast.show({
          type: "error",
          text1: error.request,
        });
      } else {
        Toast.show({
          type: "error",
          text1: error.message,
        });
      }
    },
  });

  return { form, mutation };
};

export default useLikePost;
