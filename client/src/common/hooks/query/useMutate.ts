import { ErrorResponse } from "@/common/interface/error.interface";
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import Toast from "react-native-toast-message";

interface MutationConfig<TData, TVariables> {
  mutationFn: (variables: TVariables) => Promise<TData>;
  mutationKey: string[];
  onSuccess?: (data: TData) => void;
  onError?: (error: AxiosError) => void;
  queryKey?: string;
}

function useMutate<TData, TVariables>({
  mutationFn,
  mutationKey,
  onSuccess,
  onError,
  queryKey: currentQueryKey,
}: MutationConfig<TData, TVariables>): UseMutationResult<
  TData,
  AxiosError,
  TVariables
> {
  const queryClient = useQueryClient();
  return useMutation<TData, AxiosError<ErrorResponse>, TVariables>({
    mutationKey,
    mutationFn,
    onSuccess: (data) => {
      if (onSuccess) {
        onSuccess(data);
        queryClient.invalidateQueries({
          predicate: (query) => {
            const queryKey = query.queryKey;
            if (queryKey[0] === currentQueryKey) {
              return true;
            }
            return false;
          },
        });
      }
    },

    onError: (error: AxiosError) => {
      if (onError) {
        onError(error);
        if (error instanceof AxiosError && error.response) {
          const { error: errorMessage } = error.response.data as any;

          console.log(errorMessage);
          Toast.show({
            type: "error",
            text1: errorMessage || "Something went wrong",
          });
        } else if (error.request) {
          Toast.show({
            type: "error",
            text1: "No response received from the server",
          });
        } else {
          Toast.show({
            type: "error",
            text1: "An unknown error occurred",
          });
        }
      }
    },
  });
}

export default useMutate;
