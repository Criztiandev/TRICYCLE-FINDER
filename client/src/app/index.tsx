import React, { useEffect } from "react";
import { Redirect } from "expo-router";
import { useAuth } from "@/providers/AuthProvider";
import useAuthStorage from "@/common/hooks/storage/useAuthStorage";

const RootLayout = () => {
  const storage = useAuthStorage();
  const { user, setCredentials } = useAuth();

  useEffect(() => {
    const checkAuthStatus = async () => {
      const storedCredentials = await storage.getItem("auth");
      const accessToken = await storage.getItem("accessToken");

      if (!storedCredentials || !accessToken) {
        await storage.removeItem("auth");
        setCredentials(null);
        return;
      }

      setCredentials(storedCredentials);
    };

    checkAuthStatus();
  }, [storage, setCredentials]);

  if (user === undefined) {
    return null; // or a loading indicator
  }

  return <Redirect href={user ? "/user/home" : "/auth/sign-in"} />;
};

export default RootLayout;
