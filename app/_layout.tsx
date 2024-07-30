import {
  NotoSerif_400Regular,
  NotoSerif_400Regular_Italic,
  NotoSerif_700Bold,
  NotoSerif_700Bold_Italic,
  useFonts,
} from "@expo-google-fonts/noto-serif";
import { useEffect, useState } from "react";
import { Stack } from "expo-router";
import LottieView from "lottie-react-native";
import { View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import Onboarding from "./Onboarding";

export default function RootLayout() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [sPlashAnimationFinished, setSPlashAnimationFinished] = useState(false);
  const [fontsLoaded, fontError] = useFonts({
    notoRegular: NotoSerif_400Regular,
    notoItalic: NotoSerif_400Regular_Italic,
    notoBold: NotoSerif_700Bold,
    notoBoldItalic: NotoSerif_700Bold_Italic,
  });
  useEffect(() => {
    if (fontsLoaded || fontError) {
      setIsLoaded(true);
    }
  }, [fontsLoaded, fontError]);
  const showAnimated = !isLoaded || !sPlashAnimationFinished;
  if (showAnimated) {
    return (
      <Animation setSPlashAnimationFinished={setSPlashAnimationFinished} />
    );
  }

  return (
    // <Animated.View entering={FadeIn.duration(300)} style={{ flex: 1 }}>
    //   <Stack />
    // </Animated.View>
    <Onboarding />
  );
}

const Animation = ({
  setSPlashAnimationFinished = (isCanceled) => {},
}: {
  setSPlashAnimationFinished?: (isCanceled: boolean) => void;
}) => {
  return (
    <Animated.View
      exiting={FadeOut}
      style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
    >
      <LottieView
        onAnimationFinish={(isCanceled) => {
          console.log("Canceled", isCanceled);
          if (!isCanceled) {
            setSPlashAnimationFinished(true);
          }
        }}
        autoPlay
        loop={false}
        style={{
          width: "100%",
          aspectRatio: 1,
          backgroundColor: "#fff",
        }}
        source={require("../assets/fonts/lottie.json")}
      />
    </Animated.View>
  );
};
