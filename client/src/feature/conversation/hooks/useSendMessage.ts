import { View, Text } from "react-native";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import useMutate from "@/common/hooks/query/useMutate";
import { ProtectedAxios } from "@/lib/axios/instances";
import { IMessage } from "react-native-gifted-chat";

const useSendMessage = (userID: string) => {
  const form = useForm();

  const mutation = useMutate({
    mutationKey: [`conversation-sent-${userID}`],
    mutationFn: async (value) =>
      await ProtectedAxios.post(`/conversation/message/${userID}`, value),
    onSuccess: () => {},
  });

  const handleSendMessage = useCallback(
    (newMessages: IMessage[] = []) => {
      const message = newMessages[0];
      if (message) {
        mutation.mutate({ message: message.text, targetID: userID });
      }
    },
    [mutation]
  );

  return { mutation, form, handleSendMessage };
};

export default useSendMessage;
