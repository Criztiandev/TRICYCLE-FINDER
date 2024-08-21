import {
  useQuery,
  UseQueryOptions,
  QueryFunction,
  QueryFunctionContext,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useLogout from "@/feature/account/hooks/useLogout";
import useScreenFocus from "../utils/useScreenFocus";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";

type CustomQueryFunction<TData> = (
  context: QueryFunctionContext
) => Promise<TData>;

interface CustomUseQueryOptions<TData, TError>
  extends Omit<UseQueryOptions<TData, TError>, "queryFn"> {
  queryFn: CustomQueryFunction<TData>;
}

const useFetch = <TData = unknown, TError = AxiosError>(
  options: CustomUseQueryOptions<TData, TError>
) => {
  const router = useRouter();
  const { isFocused } = useScreenFocus();
  const { handleLogout } = useLogout();

  return useQuery<TData, TError>({
    ...options,
    queryFn: async (context: QueryFunctionContext) => {
      try {
        const data = await options.queryFn(context);
        return data;
      } catch (error) {
        if (error instanceof AxiosError && error.response?.status === 401) {
          handleLogout();
        }

        throw error;
      }
    },

    retry: (failureCount, error) => {
      if (error instanceof AxiosError && error.response?.status === 401) {
        return false;
      }
      return failureCount < 3;
    },
    enabled: isFocused,
  });
};

export default useFetch;
