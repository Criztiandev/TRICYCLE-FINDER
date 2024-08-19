import { ScrollView, Platform, StatusBar, ScrollViewProps } from "react-native";
import React, { FC } from "react";

interface Props extends ScrollViewProps {}

const ScrollArea: FC<Props> = ({ children, ...props }) => {
  return (
    <ScrollView {...props} contentContainerStyle={{ flexGrow: 1 }}>
      {children}
    </ScrollView>
  );
};

export default ScrollArea;
