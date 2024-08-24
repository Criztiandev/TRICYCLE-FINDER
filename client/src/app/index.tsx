import React, { useEffect, useState, useCallback } from "react";
import { Href, Redirect } from "expo-router";
import { useAuth } from "@/providers/AuthProvider";
import useAuthStorage from "@/common/hooks/storage/useAuthStorage";
import { IStoredDetails } from "@/feature/account/interface/account.interface";

const RootLayout = () => {
  const storage = useAuthStorage();
  const [role, setRole] = useState<"user" | "rider" | null>(null);
  const { user, setCredentials } = useAuth();

  const checkAuthStatus = useCallback(async () => {
    try {
      const storedCredentials = await storage.getItem<IStoredDetails>("auth");
      const accessToken = await storage.getItem("accessToken");

      if (!storedCredentials || !accessToken) {
        await storage.clear();
        setCredentials(null);
        setRole(null);
        return;
      }

      setRole(storedCredentials.role);
      setCredentials(storedCredentials);
    } catch (error) {
      console.error("Error checking auth status:", error);
      setRole(null);
      setCredentials(null);
    }
  }, [storage, setCredentials]);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  if (user === undefined) {
    return null; // or a loading indicator
  }

  const routeMap: Record<"user" | "rider", Href<string>> = {
    user: "/user/home" as Href<string>,
    rider: "/rider/home" as Href<string>,
  };

  const redirectPath: Href<string> = role
    ? routeMap[role]
    : ("/auth/sign-in" as Href<string>);

  return <Redirect href={redirectPath} />;
};

export default RootLayout;
