import { View, ViewProps } from "react-native";
import React, { FC } from "react";
import { cn } from "@/lib/utils";

interface Props extends ViewProps {}

const Card: FC<Props> = ({ children, ...props }) => {
  return (
    <View
      {...props}
      className={cn("rounded-lg", props.className)}
      style={{
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
        margin: 10,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    >
      {children}
    </View>
  );
};

export default Card;
