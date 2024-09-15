import { View, Text } from "react-native";
import React, { FC, useState } from "react";
import { Image, ImageProps } from "expo-image";
import { cn } from "@/lib/utils";

// Import the image correctly for React Native
import RiderAvatar from "@/assets/images/rider-avatar.jpg";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

interface Props extends Omit<ImageProps, "source"> {
  fallback?: string;
  imageClass?: string;
  size?: number;
  source?: any; // Allow any type for source
}

const Avatar: FC<Props> = ({
  fallback,
  source = RiderAvatar, // Use the imported image as default
  size = 64,
  ...props
}) => {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <View
      style={{
        width: size,
        height: size,
      }}
    >
      <Image
        {...props}
        source={source}
        style={{
          flex: 1,
        }}
        placeholder={blurhash}
        contentFit="cover"
        transition={1000}
        onError={() => setImageFailed(true)}
      />
    </View>
  );
};

export default Avatar;
