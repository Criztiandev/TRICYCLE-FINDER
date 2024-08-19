import { View, Text } from "react-native";
import React, { FC, useEffect } from "react";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/common/interface/error.interface";
import useLocalStorage from "@/common/hooks/storage/useLocalStorage";
import { useRouter } from "expo-router";
import { useAuth } from "@/providers/AuthProvider";
import useLogout from "@/feature/account/hooks/useLogout";

interface Props {
  error?: AxiosError<ErrorResponse> | Error;
}

const ErrorScreen: FC<Props> = ({ error }) => {
  // console.log(error);
  return (
    <View className="flex-1 justify-center items-center">
      <Text>Error...</Text>
    </View>
  );
};

export default ErrorScreen;
