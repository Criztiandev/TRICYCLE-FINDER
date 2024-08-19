import useMutate from "@/common/hooks/query/useMutate";
import useAuthStorage from "@/common/hooks/storage/useAuthStorage";
import { ProtectedAxios } from "@/lib/axios/instances";
import { useAuth } from "@/providers/AuthProvider";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

const useLogout = () => {
  const { setCredentials } = useAuth();
  const storage = useAuthStorage();
  const queryClient = useQueryClient();

  const handleLogout = useCallback(async () => {
    try {
      console.log("Initiating logout process...");
      setCredentials(null);

      console.log("Removing tokens...");
      await storage.removeItem("auth");
      await storage.removeItem("accessToken");
      await storage.removeItem("refreshToken");

      console.log("Tokens removed, checking storage...");
      const authToken = await storage.getItem("accessToken");
      console.log("Access Token After Removal:", authToken);

      console.log("Clearing Axios headers...");
      delete ProtectedAxios.defaults.headers.common["Authorization"];

      console.log("Resetting queries...");
      queryClient.resetQueries();

      console.log("Logout process completed.");
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
