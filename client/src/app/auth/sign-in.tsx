import { View, Text, ScrollView } from "react-native";
import { Href, Link, Stack } from "expo-router";
import BaseLayout from "../../layout/BaseLayout";
import { FormProvider } from "react-hook-form";

import InputField from "@/common/components/form/InputField";

import useLogin from "@/feature/auth/hooks/useLogin";
import { LoginValue } from "@/feature/auth/interface/sign-in.interface";
import Button from "@/common/components/ui/Button";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";

const RootScreen = () => {
  const { form, mutation } = useLogin();

  const onSubmit = async (value: LoginValue) => {
    mutation.mutate(value);
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <BaseLayout>
        <ScrollView style={{ flexGrow: 1, padding: 0 }}>
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
          <View style={{ flexGrow: 1 }}>
            <View className="p-4 flex-1  h-full  ">
              <View className=" flex-1 justify-center items-center">
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

                  <View
                    className="my-4 flex-row justify-between items-center w-full"
                    style={{ marginHorizontal: 16 }}
                  ></View>
                </FormProvider>
                <Button
                  className="bg-black"
                  onPress={form.handleSubmit(onSubmit)}
                >
                  <Text
                    className="text-lg font-bold text-white "
                    style={{
                      fontSize: 19,
                    }}
                  >
                    Login
                  </Text>
                </Button>
              </View>

              <Text
                className="text-base text-center p-4"
                style={{
                  fontSize: 16,
                }}
              >
                You dont have an account ?
                <Link
                  href={"auth/sign-up" as Href<String>}
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: "#179151",
                    marginLeft: 8,
                  }}
                >
                  Sign up
                </Link>
              </Text>
            </View>
          </View>
        </ScrollView>
      </BaseLayout>
    </>
  );
};

export default RootScreen;
1;
