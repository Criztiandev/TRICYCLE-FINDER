import { View, TextInput, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import XStack from "@/common/components/stacks/XStack";
import Button from "@/common/components/ui/Button";
import useCreatePost from "@/feature/post/hooks/useCreatePost";
import { PostValue } from "@/feature/post/interface/post.interface";
import { ImageIcon } from "lucide-react-native";

import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";
import { Image } from "expo-image";

const RootScreen = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const { form, mutation } = useCreatePost();
  const router = useRouter();

  const handleSubmit = () => {
    const payload = form.getValues();
    mutation.mutate(payload as PostValue);
  };

  useEffect(() => {
    if (mutation.isSuccess) {
      router.back();
    }
  }, [mutation.isSuccess]);

  const handlePickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri as any);
    } else {
      Toast.show({
        type: "error",
        text1: "Image selected none",
      });
    }
  };

  return (
    <>
      <CreatePostHeader state={mutation.isPending} onSubmit={handleSubmit} />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="p-4 flex-1 h-full">
          <Controller
            control={form.control}
            name={"content"}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                textAlign="left"
                textAlignVertical="top"
                placeholder="Whats in your mind"
                className="flex-1  items-start justify-start text-start text-base min-h-[250px]"
                onChangeText={onChange}
              />
            )}
          />

          {selectedImage && (
            <Image
              source={selectedImage}
              className="flex-grow "
              style={{ width: "100%", minHeight: 800, resizeMode: "cover" }}
            />
          )}
        </View>
      </ScrollView>

      <View className="p-2">
        <XStack className="justify-end items-center">
          <Button variant="ghost" size="icon" onPress={handlePickImage}>
            <ImageIcon color="black" />
          </Button>
        </XStack>
      </View>
    </>
  );
};

export default RootScreen;

interface CreatePostProps {
  onSubmit: () => void;
  state?: boolean;
}

const CreatePostHeader: React.FC<CreatePostProps> = ({ onSubmit, state }) => {
  return (
    <Stack.Screen
      options={{
        title: "Create Post",
        headerRight: () => (
          <XStack>
            <Button
              disabled={state}
              variant="ghost"
              textClassName="text-black "
              onPress={onSubmit}
            >
              Create
            </Button>
          </XStack>
        ),
      }}
    />
  );
};
