import React from "react";
import { NotifyOnChangeProps } from "@tanstack/query-core";
import { useFocusEffect } from "@react-navigation/native";

/**
 * This hook provides a notifyOnChangeProps option that prevents re-renders when a screen is out of focus
 * @param notifyOnChangeProps - The original notifyOnChangeProps option from React Query
 * @returns A function that returns the appropriate notifyOnChangeProps based on screen focus
 */
export function useFocusNotifyOnChangeProps(
  notifyOnChangeProps?: NotifyOnChangeProps
) {
  // Ref to keep track of whether the screen is currently focused
  const focusedRef = React.useRef(true);

  useFocusEffect(
    React.useCallback(() => {
      // When the screen comes into focus, set focusedRef to true
      focusedRef.current = true;

      // When the screen goes out of focus, set focusedRef to false
      return () => {
        focusedRef.current = false;
      };
    }, [])
  );

  // Return a function that will be used as the new notifyOnChangeProps
  return () => {
    // If the screen is not focused, return an empty array to prevent re-renders
    if (!focusedRef.current) {
      return [];
    }

    // If the screen is focused, use the original notifyOnChangeProps
    if (typeof notifyOnChangeProps === "function") {
      return notifyOnChangeProps();
    }

    return notifyOnChangeProps;
  };
}

/**
* Example
*
    const focusNotifyOnChangeProps = useFocusNotifyOnChangeProps()

    const { data } = useQuery(['myData'], fetchData, {
        notifyOnChangeProps: focusNotifyOnChangeProps,
    })
*/
