import { View, Text, ScrollView } from "react-native";
import { Href, Link, Stack, useRouter } from "expo-router";
import BaseLayout from "../../layout/BaseLayout";
import { FormProvider } from "react-hook-form";

import InputField from "@/common/components/form/InputField";
import CheckboxField from "@/common/components/form/CheckboxField";
import Button from "@/common/components/ui/Button";

import useLogin from "@/feature/auth/hooks/useLogin";
import { LoginValue } from "@/feature/auth/interface/sign-in.interface";

const RootScreen = () => {
  const router = useRouter();
  const { form, mutation } = useLogin();

  const onSubmit = async (value: LoginValue) => {
    mutation.mutate(value);
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <BaseLayout>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="p-4 flex-1  h-full  ">
            <View className=" flex-1 justify-center items-center">
              <Text className="text-[32px] font-medium mb-12 text-center">
                Sign in Your Account
              </Text>
              <FormProvider {...form}>
                <InputField
                  type="email"
                  label="Email"
                  name="email"
                  placeholder="Enter your email"
                />

                <InputField
                  type="password"
                  label="Password"
                  name="password"
                  placeholder="Enter your password"
                  dir="right"
                />

                <View className="my-4 flex-row justify-between items-center w-full">
                  <CheckboxField name="toc" label="Remember me" />
                  <Link href="/" push className="text-base text-link">
                    Forgot Password
                  </Link>
                </View>
              </FormProvider>
              <Button className="w-full" onPress={form.handleSubmit(onSubmit)}>
                Sign in
              </Button>
            </View>

            <Text className="text-base text-center p-4">
              Don't have an account ?{" "}
              <Link href={"auth/sign-up" as Href<String>} className="text-link">
                Sign up
              </Link>
            </Text>
          </View>
        </ScrollView>
      </BaseLayout>
    </>
  );
};

export default RootScreen;
