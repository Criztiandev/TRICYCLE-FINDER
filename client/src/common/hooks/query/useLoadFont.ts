import { useEffect } from "react";
import { useFonts } from "expo-font";
import { SplashScreen } from "expo-router";

SplashScreen.preventAutoHideAsync();

const useLoadFont = () => {
  const [loaded] = useFonts({
    SpaceMono: require("@/assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
};

export default useLoadFont;
