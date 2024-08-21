import { Href, Stack, useRouter } from "expo-router";
import ScreenBaseLayout from "@/layout/ScreenBaseLayout";
import { FlashList } from "@shopify/flash-list";
import XStack from "@/common/components/stacks/XStack";
import Button from "@/common/components/ui/Button";
import { MessageCircle } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import Input from "@/common/components/ui/Input";
import Avatar from "@/common/components/ui/Avatar";
import YStack from "@/common/components/stacks/YStack";
import AccountBlob from "@/feature/account/component/AccountBlob";

const RootScreen = () => {
  const router = useRouter();

  // if (isLoading) return <LoadingScreen />;
  // if (isError) return <ErrorScreen error={error} />;

  return (
    <>
      <HomeScreenHeader />
      <ScreenBaseLayout>
        <TouchableOpacity className="w-full px-4">
          <Input
            placeholder="Whats is in your mind ?"
            className="rounded-full px-3"
            disabled
          />
        </TouchableOpacity>
        <FlashList
          data={[{}]}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                router.navigate(`/account/details/66c4dbeaea8330619107f99f`)
              }
            >
              <AccountBlob {...item} />
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

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <XStack>
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
            </XStack>
          ),
        }}
      />
    </>
  );
};
