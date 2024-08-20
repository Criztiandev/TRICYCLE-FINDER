import React from "react";
import { Tabs } from "expo-router";
import { Disc, Home, Search, UserCircle } from "lucide-react-native";

const RootLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: (props) => (
            <Home color={props.focused ? "black" : props.color} />
          ),
        }}
      />

      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          tabBarIcon: (props) => (
            <UserCircle color={props.focused ? "black" : props.color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default RootLayout;
