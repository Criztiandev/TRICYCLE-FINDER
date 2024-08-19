import React, { FC, ReactElement } from "react";
import { Tabs } from "expo-router";

interface Props {
  label: string;
  icon: (props: { color: string }) => ReactElement;
}

const TabBar: FC<Props> = ({ label, icon }) => {
  return (
    <Tabs.Screen
      options={{
        title: label,
        tabBarIcon: (props) =>
          icon({ color: props.focused ? "black" : props.color }),
      }}
    />
  );
};

export default TabBar;
