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
  OtherInfoStepValidation,
} from "@/feature/auth/validation";
import useRegister from "@/feature/auth/hooks/useRegister";
import { IAccount } from "@/feature/account/interface/account.interface";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import OtherInfoStep from "@/feature/auth/component/steps/OtherInfoStep";

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
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 72,
            }}
          >
            <Text
              style={{ fontSize: 32, fontWeight: "bold", paddingVertical: 32 }}
            >
              TRIFINDER
            </Text>
            <View
              style={{
                width: 350,
                height: 350,
                borderWidth: 18,
                borderColor: "#179151",
                backgroundColor: "#95d9a5",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 999,
              }}
            >
              <Image
                source={require("@/assets/images/Hero-logo.png")}
                style={{
                  width: 250,
                  height: 250,
                  marginTop: 32,
                }}
              />
            </View>
            <LinearGradient
              colors={["#0097b2", "#7ed957"]} // Define gradient colors here
              style={{
                position: "absolute",

                width: 600,
                height: 600,
                borderRadius: 999,
                zIndex: -5,
              }}
              start={{ x: 0, y: 0 }} // Start point for the gradient (top-left)
              end={{ x: 1, y: 1 }} // End point for the gradient (bottom-right)
            />
          </View>
          <View className="p-4 flex-1  ">
            <View className=" flex-1 justify-center items-center">
              <FormProvider {...form}>{element}</FormProvider>

              <View style={{ marginVertical: 16 }}>
                <Button
                  className="w-full mb-3 mt-4"
                  onPress={form.handleSubmit(onSubmit)}
                  // disabled={mutation.isPending}
                >
                  <Text
                    className="text-lg font-bold text-white "
                    style={{
                      fontSize: 19,
                    }}
                  >
                    {isLastStep ? "Sign up" : "Next"}
                  </Text>
                </Button>
              </View>
              {!isFistStep && (
                <Button
                  className="w-full bg-white border border-[#ccc] "
                  textClassName="color-black"
                  onPress={prevStep}
                >
                  <Text
                    className="text-lg font-bold text-white "
                    style={{
                      fontSize: 19,
                    }}
                  >
                    Back
                  </Text>
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

  { component: <OtherInfoStep />, validation: OtherInfoStepValidation },
  { component: <AccountInfoStep />, validation: AccountInfoStepValidation },
];
