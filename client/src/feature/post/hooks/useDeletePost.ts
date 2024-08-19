import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { ErrorResponse } from "@/common/interface/error.interface";
import { ProtectedAxios } from "@/lib/axios/instances";
import Toast from "react-native-toast-message";
import useMutate from "@/common/hooks/query/useMutate";

const useDeletePost = (id: string) => {
  return useMutate({
    queryKey: "user-post",
    mutationKey: [`delete-post-${id}`],
    mutationFn: async () => ProtectedAxios.delete(`/post/delete/${id}`),

    onSuccess: () => {},
  });
  //   const mutation = useMutation<
  //     AxiosResponse<any>,
  //     AxiosError<ErrorResponse>,
  //     any
  //   >({
  //     mutationKey: [`delete-post-${id}`],
  //     mutationFn: async () =>,

  //     onSuccess: (data) => {},

  //     onError: (error: AxiosError<ErrorResponse>) => {
  //       if (error.response) {
  //         const { error: errorMessage } = error.response.data;
  //         Toast.show({
  //           type: "error",
  //           text1: errorMessage,
  //         });
  //       } else if (error.request) {
  //         Toast.show({
  //           type: "error",
  //           text1: error.request,
  //         });
  //       } else {
  //         Toast.show({
  //           type: "error",
  //           text1: error.message,
  //         });
  //       }
  //     },
  //   });

  //   return { mutation };
};

export default useDeletePost;
