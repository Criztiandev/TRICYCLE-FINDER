import { View, Text } from "react-native";
import React, { FC, useState } from "react";
import { Image, ImageProps } from "expo-image";
import { cn } from "@/lib/utils";

// Import the image correctly for React Native
import IMG from "@/assets/images/user-avatar.jpg";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

interface Props extends Omit<ImageProps, 'source'> {
  fallback?: string;
  imageClass?: string;
  size?: number;
  source?: any; // Allow any type for source
}

const UserAvatar: FC<Props> = ({
  fallback,
  source = IMG, // Use the imported image as default
  size = 64,
  ...props
}) => {
  const [imageFailed, setImageFailed] = useState(false);
  
  return (
    <View
      className={cn(
        "border border-gray-300 rounded-full overflow-hidden justify-center items-center",
        props.className
      )}
      style={{ width: size, height: size }}
    >
      {imageFailed ? (
        <View className="w-full h-full justify-center items-center bg-slate-200">
          <Text className="text-xl font-bold ">{fallback || "T"}</Text>
        </View>
      ) : (
        <Image
          {...props}
          source={source}
          className={cn("flex-1 w-full bg-[#0553]", props.imageClass)}
          placeholder={blurhash}
          contentFit="cover"
          transition={1000}
          onError={() => setImageFailed(true)}
        />
      )}
    </View>
  );
};

export default UserAvatar;