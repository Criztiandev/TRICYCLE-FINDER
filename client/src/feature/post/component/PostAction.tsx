import { View, Text } from "react-native";
import React, { FC } from "react";
import XStack from "@/common/components/stacks/XStack";
import { Share2, ThumbsUp } from "lucide-react-native";
import Button from "@/common/components/ui/Button";
import { PostDetails } from "../interface/post.interface";
import useLikePost from "../hooks/useLikePost";

const PostAction: FC<PostDetails> = ({ _id, isLiked }) => {
  const { mutation } = useLikePost(_id || "", "user-post");

  const handleLike = () => mutation.mutate("");

  return (
    <XStack className="justify-between items-center">
      <XStack>
        <Button
          variant="ghost"
          className=" justify-center items-center"
          onPress={handleLike}
          disabled={mutation.isPending}
        >
          <ThumbsUp color={isLiked ? "#3498db" : "black"} />
        </Button>
        {/* 
      <Button
        className="justify-center items-center"
        variant="ghost"
        onPress={() => router.push("/user/post/details/123123")}
      >
        <MessageSquare color="black" />
      </Button> */}
      </XStack>

      <Button className="flex-1 justify-center items-end" variant="ghost">
        <Share2 color="black" />
      </Button>
    </XStack>
  );
};

export default PostAction;
