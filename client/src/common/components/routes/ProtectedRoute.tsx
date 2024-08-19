import { View, Text } from "react-native";
import React, { FC, PropsWithChildren, useEffect } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "expo-router";

interface Props extends PropsWithChildren {}

const ProtectedRoute: FC<Props> = ({ children }) => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      setTimeout(() => {
        router.replace("/auth/sign-in");
      }, 1);
    }
  }, [user]);

  return children;
};

export default ProtectedRoute;
