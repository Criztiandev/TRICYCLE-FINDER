import React, { useEffect, useState } from "react";
import { Href, Redirect } from "expo-router";
import { useAuth } from "@/providers/AuthProvider";
import useAuthStorage from "@/common/hooks/storage/useAuthStorage";
import { IStoredDetails } from "@/feature/account/interface/account.interface";

const RootLayout = () => {
  const storage = useAuthStorage();
  const [role, setRole] = useState<"user" | "rider">("user");
  const { user, setCredentials } = useAuth();

  useEffect(() => {
    const checkAuthStatus = async () => {
      const storedCredentials =
        (await storage.getItem<IStoredDetails>("auth")) || null;
      const accessToken = await storage.getItem("accessToken");

      if (!storedCredentials || !accessToken) {
        await storage.removeItem("auth");
        setCredentials(null);
        return;
      }
      setRole(storedCredentials.role);
      setCredentials(storedCredentials);
    };

    checkAuthStatus();
  }, [storage, setCredentials]);

  if (user === undefined) {
    return null; // or a loading indicator
  }

  const routeMap: Record<"user" | "rider", string> = {
    user: "/user/home",
    rider: "/rider/home",
  };

  return <Redirect href={role ? routeMap[role] : ("/auth/sign-in" as any)} />;
};

export default RootLayout;
