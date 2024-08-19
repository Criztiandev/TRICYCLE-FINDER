import { View, TextInput } from "react-native";
import React, { useEffect } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import XStack from "@/common/components/stacks/XStack";
import Button from "@/common/components/ui/Button";
import { PostValue } from "@/feature/post/interface/post.interface";
import useUpdatePost from "@/feature/post/hooks/useUpdatePost";
import LoadingScreen from "@/layout/screen/LoadingScreen";
import usePostDetails from "@/feature/post/hooks/usePostDetails";
import ErrorScreen from "@/layout/screen/ErrorScreen";

const RootScreen = () => {
  const { id } = useLocalSearchParams();
  const { data, isLoading, isError, refetch } = usePostDetails(id as string);
  const { form, mutation } = useUpdatePost(id as string);

  const handleSubmit = () => {
    const payload = form.getValues();
    mutation.mutate(payload as PostValue);
  };

  useEffect(() => {
    if (data) {
      const { content } = data;
      form.setValue("content", content);
    }
  }, [data]);

  useEffect(() => {
    if (mutation.isSuccess) {
      refetch();
    }
  }, [mutation.isSuccess]);

  if (isLoading) return <LoadingScreen />;
  if (isError) return <ErrorScreen />;

  return (
    <>
      <UpdatePostHeader state={mutation.isPending} onSubmit={handleSubmit} />
      <View className="flex-1 p-4">
        <Controller
          control={form.control}
          name={"content"}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              value={value}
              textAlign="left"
              textAlignVertical="top"
              placeholder="Whats in your mind"
              className="flex-1  items-start justify-start text-start text-base"
              onChangeText={onChange}
            />
          )}
        />
      </View>
    </>
  );
};

export default RootScreen;

interface UpdatePostProps {
  onSubmit: () => void;
  state?: boolean;
}

const UpdatePostHeader: React.FC<UpdatePostProps> = ({ onSubmit, state }) => {
  return (
    <Stack.Screen
      options={{
        title: "Update Post",
        headerRight: () => (
          <XStack>
            <Button
              disabled={state}
              variant="ghost"
              textClassName="text-black "
              onPress={onSubmit}
            >
              Update
            </Button>
          </XStack>
        ),
      }}
    />
  );
};
