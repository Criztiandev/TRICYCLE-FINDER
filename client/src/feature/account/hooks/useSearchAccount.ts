import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useMutate from "@/common/hooks/query/useMutate";
import { ProtectedAxios } from "@/lib/axios/instances";
import { AccountDetails } from "../interface/account.interface";

const useSearchAccount = () => {
  const [searchedAccount, setSearchedAccount] = useState<
    AccountDetails[] | null
  >(null);
  const form = useForm();

  const mutation = useMutate({
    mutationKey: ["search-account"],
    mutationFn: async () =>
      await ProtectedAxios.post("/account/search", form.getValues()),
    onSuccess: ({ data }) => {
      const { payload } = data;
      setSearchedAccount(payload);
    },
  });

  return { form, mutation, searchedAccount, setSearchedAccount };
};

export default useSearchAccount;
