import {
  View,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import React, { FC, PropsWithChildren } from "react";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

interface Props extends PropsWithChildren, TouchableOpacityProps {
  variant?: "default" | "secondary" | "outlined" | "ghost";
  size?: "default" | "icon";
  textClassName?: string;
}

const buttonVariants = cva(" px-4 py-3 text-center rounded-[10px] ", {
  variants: {
    variant: {
      default: "bg-black",
      outlined: "border border-gray-300",
      secondary: "bg-secondary",
      ghost: "bg-transparent border-none",
      link: "",
    },
    size: {
      default: "px-4 py-3",
      icon: "flex justify-center items-center min-w-[48px] max-w-[58px] min-h-[48px] max-h-[58px]",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

const Button: FC<Props> = ({
  children,
  variant,
  size,
  className,
  ...props
}) => {
  const textClasses = cn(
    "text-center text-base text-primary",
    props.textClassName
  );

  return (
    <TouchableOpacity
      {...props}
      style={{
        backgroundColor: "#94b143",
        padding: 14,
        borderRadius: 999,
        minWidth: 200,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "black",
      }}
    >
      {children}
    </TouchableOpacity>
  );
};

export default Button;
