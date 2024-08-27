import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { LoginValidation } from "../validation/auth.validation";
import { LoginResponse, LoginValue } from "../interface/sign-in.interface";

import { useAuth } from "@/providers/AuthProvider";
import { PublicAxios } from "@/lib/axios/instances";
import useMutate from "@/common/hooks/query/useMutate";
import { AxiosResponse } from "axios";
import useAuthStorage from "@/common/hooks/storage/useAuthStorage";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";

const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { setCredentials } = useAuth();
  const storage = useAuthStorage();
  const form = useForm<LoginValue>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(LoginValidation),
  });

  const mutation = useMutate({
    mutationKey: ["user-login"],
    mutationFn: async (value: LoginValue) =>
      await PublicAxios.post("/auth/login", value),
    onSuccess: async (response: AxiosResponse<LoginResponse>) => {
      const { payload } = response.data;

      queryClient.clear();
      setCredentials(null);

      await storage.clear();
      await storage.setItem("accessToken", payload.accessToken);
      await storage.setItem("refreshToken", payload.refreshToken);
      await storage.setItem("auth", payload.user);

      setCredentials(payload.user);
    },
  });
  return { form, mutation };
};

export default useLogin;
