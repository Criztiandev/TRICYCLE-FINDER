import { View, Text } from "react-native";
import React, { FC } from "react";
import YStack from "@/common/components/stacks/YStack";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import PostCardHeader from "./PostCardHeader";
import PostAction from "./PostAction";
import { PostDetails } from "../interface/post.interface";

interface Props extends PostDetails {}

const PostCard: FC<Props> = ({ details, createdAt, ...props }) => {
  return (
    <View className="mb-4">
      <PostCardHeader {...details} createdAt={createdAt} />
      <PostCardContent {...(props as PostDetails)} />
    </View>
  );
};

export default PostCard;

const PostCardContent: FC<PostDetails> = (props) => {
  const { _id, content, isLiked, likeCount } = props;
  const router = useRouter();

  return (
    <YStack>
      <View className="flex-1 h-full min-h-[200px] my-4">
        <Image
          source={
            "https://images.pexels.com/photos/745081/pexels-photo-745081.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          }
          className="flex-1"
        />
      </View>

      <View className="mb-4">
        <Text>{content}</Text>
      </View>

      <PostAction {...props} />
    </YStack>
  );
};
