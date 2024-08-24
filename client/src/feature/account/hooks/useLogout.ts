import useMutate from "@/common/hooks/query/useMutate";
import useAuthStorage from "@/common/hooks/storage/useAuthStorage";
import { ProtectedAxios } from "@/lib/axios/instances";
import { useAuth } from "@/providers/AuthProvider";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import * as Updates from "expo-updates";
import { useRouter } from "expo-router";

const useLogout = () => {
  const { setCredentials } = useAuth();
  const storage = useAuthStorage();
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleLogout = useCallback(async () => {
    try {
      setCredentials(null);

      await storage.removeItem("auth");
      await storage.removeItem("accessToken");
      await storage.removeItem("refreshToken");

      delete ProtectedAxios.defaults.headers.common["Authorization"];
      queryClient.clear();

      router.dismissAll();
      router.replace("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  }, [setCredentials, storage, queryClient]);

  const mutation = useMutate({
    mutationKey: ["user-logout"],
    mutationFn: async () => await ProtectedAxios.delete("/account/logout"),
    onSuccess: handleLogout,
    onError: (error) => {
      console.error("Logout failed:", error);
      handleLogout();
    },
  });

  return { mutation, handleLogout };
};

export default useLogout;
