import PostCard from "@/feature/post/component/PostCard";
import { Href, Stack, useRouter } from "expo-router";
import ScreenBaseLayout from "@/layout/ScreenBaseLayout";
import { FlashList } from "@shopify/flash-list";
import XStack from "@/common/components/stacks/XStack";
import Button from "@/common/components/ui/Button";
import { CirclePlusIcon, MessageCircle, Search } from "lucide-react-native";
import BottomSheet from "@/common/components/ui/BottomSheet";
import { TouchableOpacity, View } from "react-native";
import { useCallback, useMemo, useRef } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import LoadingScreen from "@/layout/screen/LoadingScreen";
import ErrorScreen from "@/layout/screen/ErrorScreen";
import { PostDetails } from "@/feature/post/interface/post.interface";
import usePosts from "@/feature/post/hooks/usePosts";
import Input from "@/common/components/ui/Input";

const RootScreen = () => {
  const { data: post, isLoading, isError, error } = usePosts();
  const router = useRouter();

  if (isLoading) return <LoadingScreen />;
  if (isError) return <ErrorScreen error={error} />;

  return (
    <>
      <HomeScreenHeader />
      <ScreenBaseLayout>
        <TouchableOpacity className="w-full ">
          <Input
            placeholder="Whats is in your mind ?"
            className="rounded-full px-3"
            disabled
          />
        </TouchableOpacity>
        <FlashList
          data={post as PostDetails[]}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }: { item: PostDetails }) => (
            <TouchableOpacity
              onPress={() =>
                router.navigate(
                  `/user/post/details/${item._id}` as Href<string>
                )
              }
            >
              <PostCard {...item} />
            </TouchableOpacity>
          )}
          estimatedItemSize={100}
        />
      </ScreenBaseLayout>
    </>
  );
};

export default RootScreen;

/**
 * Home Tab Header
 * @purpose - to display the Title, Message and Create Post
 */

const HomeScreenHeader = () => {
  const router = useRouter();
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  // Memoize the snapPoints
  const snapPoints = useMemo(() => ["25%", "50%"], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  const handleNavigate = (path: string) => {
    bottomSheetRef.current?.close();
    router.push(path as Href<String>);
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
                onPress={() =>
                  router.navigate("/account/search" as Href<string>)
                }
              >
                <Search color="black" />
              </Button>
              {/* Message Button */}
              <Button
                variant="ghost"
                size="icon"
                onPress={() =>
                  router.push("/user/conversation/list" as Href<string>)
                }
              >
                <MessageCircle color="black" />
              </Button>

              {/* Create Post Modal */}
              <Button
                variant="ghost"
                size="icon"
                onPress={handlePresentModalPress}
              >
                <CirclePlusIcon color="black" />
              </Button>
            </XStack>
          ),
        }}
      />

      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        className="p-4 space-y-2 justify-center"
      >
        <View className="space-y-2 my-4 w-full">
          <Button onPress={() => handleNavigate("/user/post/create")}>
            Post
          </Button>
          <Button onPress={() => handleNavigate("/user/activity/create")}>
            Activity
          </Button>
        </View>
      </BottomSheet>
    </>
  );
};
