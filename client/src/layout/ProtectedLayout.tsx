import { View, Text, ViewProps } from "react-native";
import React, { FC, PropsWithChildren } from "react";
import ProtectedRoute from "@/components/routes/ProtectedRoute";
import BaseLayout from "./BaseLayout";

interface Props extends PropsWithChildren, ViewProps {}

const ProtectedBaseLayout: FC<Props> = ({ children, ...props }) => {
  return (
    <ProtectedRoute>
      <BaseLayout {...props}>{children}</BaseLayout>
    </ProtectedRoute>
  );
};

export default ProtectedBaseLayout;
