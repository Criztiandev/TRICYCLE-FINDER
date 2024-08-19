import XStack from "@/common/components/stacks/XStack";
import YStack from "@/common/components/stacks/YStack";
import Avatar from "@/common/components/ui/Avatar";
import { AccountDetails } from "@/feature/account/interface/account.interface";
import { FC } from "react";
import { Text } from "react-native";

interface Props
  extends Pick<AccountDetails, "firstName" | "lastName" | "location"> {
  createdAt?: any;
}

const PostCardHeader: FC<Props> = ({ firstName, lastName, location }) => {
  const minuteAgo = "";

  return (
    <XStack className="w-full  justify-between items-center px-2 py-2 ">
      <XStack className="space-x-2 items-center">
        <Avatar size={64} />
        <YStack>
          <Text className="text-base">
            {firstName || "John"} {lastName || "Doe"}
          </Text>
          <XStack className="space-x-2 `">
            <Text className="text-gray-500">3 minutes</Text>
            <Text>-</Text>
            <Text className="text-gray-500">Caloocan City</Text>
          </XStack>
        </YStack>
      </XStack>
    </XStack>
  );
};

export default PostCardHeader;
