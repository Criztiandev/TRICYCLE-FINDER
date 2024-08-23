import { Href, Stack, useRouter } from "expo-router";
import ScreenBaseLayout from "@/layout/ScreenBaseLayout";
import { FlashList } from "@shopify/flash-list";
import XStack from "@/common/components/stacks/XStack";
import Button from "@/common/components/ui/Button";
import { MessageCircle } from "lucide-react-native";
import { TouchableOpacity } from "react-native";
import Input from "@/common/components/ui/Input";
import AccountBlob from "@/feature/account/component/AccountBlob";
import LoadingScreen from "@/layout/screen/LoadingScreen";
import ErrorScreen from "@/layout/screen/ErrorScreen";
import { IAccount } from "@/feature/account/interface/account.interface";
import useRiderList from "@/feature/rider/hooks/useRiderList";
import useRiderRequestList from "@/feature/rider/hooks/useRiderRequestList";

const RootScreen = () => {
  const { data, isLoading, isError, error } = useRiderRequestList();
  const router = useRouter();

  if (isLoading) return <LoadingScreen />;
  if (isError) return <ErrorScreen error={error} />;

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
          data={data}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }: { item: any }) => (
            <TouchableOpacity
              onPress={() =>
                router.navigate(`/rider/booking/request/${item?._id}`)
              }
            >
              <AccountBlob {...item.senderID} />
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
                  router.push("/rider/conversation/list" as Href<string>)
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
