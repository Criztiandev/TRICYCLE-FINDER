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
      default: "bg-primary",
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
  const renderContent = () => {
    if (typeof children === "string") {
      return <Text className={textClasses}>{children}</Text>;
    }
    if (typeof children === "object" && children !== null) {
      const childrenAsString = String(children);
      if (childrenAsString.trim() !== "[object Object]") {
        return <Text className={textClasses}>{childrenAsString}</Text>;
      }
    }
    return children;
  };
  return (
    <TouchableOpacity
      {...props}
      className={cn(
        `${props.disabled && "opacity-60"}`,
        buttonVariants({ variant, size, className })
      )}
    >
      {renderContent()}
    </TouchableOpacity>
  );
};

export default Button;
