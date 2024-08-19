import { View, Text } from "react-native";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { ErrorResponse } from "@/common/interface/error.interface";
import { ProtectedAxios } from "@/lib/axios/instances";
import Toast from "react-native-toast-message";
import { PostValue } from "../interface/post.interface";
import useMutate from "@/common/hooks/query/useMutate";

const useUpdatePost = (id: string) => {
  const form = useForm();

  const mutation = useMutate({
    queryKey: `post-details-${id}`,
    mutationKey: [`update-post-${id}`],
    mutationFn: async (value: PostValue) => {
      const { payload } = (
        await ProtectedAxios.put(`/post/update/${id}`, value)
      ).data;
      return payload;
    },

    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Updated Successfully",
      });
    },
  });

  return { form, mutation };
};

export default useUpdatePost;
