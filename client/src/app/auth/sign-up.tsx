import React, { useEffect } from "react";
import { Link, Stack, useRouter } from "expo-router";
import BaseLayout from "@/layout/BaseLayout";
import { ScrollView, Text, View } from "react-native";
import Button from "@/common/components/ui/Button";
import { FormProvider } from "react-hook-form";

import { PersonalInfoStep, AccountInfoStep } from "@/feature/auth/component";
import {
  PersonalInfoStepValidation,
  AccountInfoStepValidation,
} from "@/feature/auth/validation";
import useRegister from "@/feature/auth/hooks/useRegister";
import { IAccount } from "@/feature/account/interface/account.interface";

const RootScreen = () => {
  const { multiform, form, mutation } = useRegister({
    defaultValues: {},
    steps: StepsList,
  });
  const router = useRouter();

  const { element, isFistStep, isLastStep, nextStep, prevStep } = multiform;

  useEffect(() => {
    if (mutation.isSuccess) {
      router.replace("/");
    }
  }, [mutation.isSuccess]);

  const onSubmit = async () => {
    if (!isLastStep) {
      nextStep();
      return;
    }

    const payload = form.getValues();
    mutation.mutate(payload as IAccount);
  };
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <BaseLayout>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="p-4 flex-1  ">
            <View className=" flex-1 justify-center items-center">
              <Text className="text-[32px] font-medium mb-12 text-center">
                Sign Up Your Account
              </Text>

              <FormProvider {...form}>{element}</FormProvider>

              <Button
                className="w-full mb-3 mt-4"
                onPress={form.handleSubmit(onSubmit)}
                // disabled={mutation.isPending}
              >
                {isLastStep ? "Sign up" : "Next"}
              </Button>

              {!isFistStep && (
                <Button
                  className="w-full bg-white border border-[#ccc] "
                  textClassName="color-black"
                  onPress={prevStep}
                >
                  Back
                </Button>
              )}
            </View>

            {isFistStep && (
              <Text className="text-base text-center p-4 ">
                Already have an account ?{" "}
                <Link href="/auth/sign-in" className="text-blue-500">
                  Sign in
                </Link>
              </Text>
            )}
          </View>
        </ScrollView>
      </BaseLayout>
    </>
  );
};

export default RootScreen;

// Helper

const StepsList = [
  {
    component: <PersonalInfoStep />,
    validation: PersonalInfoStepValidation,
  },
  { component: <AccountInfoStep />, validation: AccountInfoStepValidation },
];
