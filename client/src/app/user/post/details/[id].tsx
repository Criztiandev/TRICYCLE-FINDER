import { View, Text } from "react-native";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import usePostDetails from "@/feature/post/hooks/usePostDetails";
import LoadingScreen from "@/layout/screen/LoadingScreen";
import ErrorScreen from "@/layout/screen/ErrorScreen";
import PostCardHeader from "@/feature/post/component/PostCardHeader";
import Button from "@/common/components/ui/Button";
import {
  MessageSquare,
  Pencil,
  Share2,
  ThumbsUp,
  Trash2,
} from "lucide-react-native";
import XStack from "@/common/components/stacks/XStack";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import BottomSheet from "@/common/components/ui/BottomSheet";
import YStack from "@/common/components/stacks/YStack";
import useDeletePost from "@/feature/post/hooks/useDeletePost";
import { PostDetails } from "@/feature/post/interface/post.interface";
import useLikePost from "@/feature/post/hooks/useLikePost";

const RootScreen = () => {
  const { id } = useLocalSearchParams();
  const { isLoading, isError, data } = usePostDetails(id as string);
  const { mutation: likeMutation } = useLikePost(
    id as string,
    `user-post-${id}`
  );

  if (isLoading) return <LoadingScreen />;
  if (isError) return <ErrorScreen />;

  if (!data) return null;

  const { details, content, createdAt, _id, isLiked } = data as PostDetails;

  const handleLikePost = () => {
    likeMutation.mutate("");
  };

  return (
    <>
      <DetailsPostHeader id={_id} />
      <View className="px-2 space-y-4">
        <PostCardHeader {...details} createdAt={createdAt} />
        <View className="min-h-[200px] w-full px-3">
          <Text className="text-base">{content}</Text>
        </View>

        <XStack className="space-x-4">
          <Button
            variant="outlined"
            className="bg-gray-200/50 justify-center items-center flex-1"
            onPress={handleLikePost}
            disabled={likeMutation.isPending}
          >
            <ThumbsUp color={isLiked ? "#3498db" : "black"} />
          </Button>

          <Button
            variant="outlined"
            className="justify-center items-center flex-1"
          >
            <MessageSquare color="black" />
          </Button>

          <Button
            variant="outlined"
            className="justify-center items-center flex-1"
          >
            <Share2 color="black" />
          </Button>
        </XStack>

        <View>
          <View className="w-full border-b"></View>
        </View>
      </View>
    </>
  );
};

export default RootScreen;

interface IProps {
  id: string | any;
}

const DetailsPostHeader: React.FC<IProps> = () => {
  const { id: postID } = useLocalSearchParams();
  const { isSuccess, isPending, mutate } = useDeletePost(postID as string);

  const router = useRouter();
  const deleteSheetRef = useRef<BottomSheetModal | null>(null);

  // Memoize the snapPoints
  const snapPoints = useMemo(() => ["50%"], []);

  const toggleDeleteModal = useCallback(() => {
    deleteSheetRef.current?.present();
  }, []);

  const toggleCloseDeleteModal = useCallback(() => {
    deleteSheetRef.current?.close();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      router.back();
      toggleCloseDeleteModal();
    }
  }, [isSuccess]);

  const handleDelete = () => {
    mutate("");
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <XStack>
              <Button
                variant="ghost"
                size="icon"
                onPress={() => router.push(`/user/post/update/${postID}`)}
              >
                <Pencil color="black" />
              </Button>
              <Button variant="ghost" size="icon" onPress={toggleDeleteModal}>
                <Trash2 color="black" />
              </Button>
            </XStack>
          ),
        }}
      />

      <BottomSheet
        ref={deleteSheetRef}
        index={0}
        snapPoints={snapPoints}
        className="p-4 space-y-2 justify-center"
      >
        <View className="space-y-2 my-4 w-full justify-between  flex-1 mb-12">
          <YStack>
            <Text className="text-center text-2xl font-bold">
              Are you sure you want to delete this post
            </Text>

            <Text className="text-base opacity-50 text-center my-4">
              You are about to delete this post, this action cannot be undone
            </Text>
          </YStack>
          <XStack className="w-full space-x-4 h-[140px]">
            <YStack className="w-full h-full space-y-4">
              <Button
                className="flex-1"
                onPress={handleDelete}
                disabled={isPending}
              >
                Delete
              </Button>
              <Button
                variant="outlined"
                className="flex-1"
                textClassName="text-black"
                onPress={toggleCloseDeleteModal}
              >
                Cancel
              </Button>
            </YStack>
          </XStack>
        </View>
      </BottomSheet>
    </>
  );
};
