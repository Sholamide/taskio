import { useEffect, useState } from "react";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import LottieView from "lottie-react-native";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";

import { useColorScheme } from "@/components/useColorScheme";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { FadeOut } from "react-native-reanimated";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(onboarding)/index",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [sPlashAnimationFinished, setSPlashAnimationFinished] = useState(false);
  const [loaded, error] = useFonts({
    spacemono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    latoblack: require("../assets/fonts/lato/Lato-Black.ttf"),
    latobold: require("../assets/fonts/lato/Lato-Bold.ttf"),
    latoregular: require("../assets/fonts/lato/Lato-Regular.ttf"),
    poppinsblack: require("../assets/fonts/poppins/Poppins-Black.ttf"),
    poppinsextrabold: require("../assets/fonts/poppins/Poppins-ExtraBold.ttf"),
    poppinsbold: require("../assets/fonts/poppins/Poppins-Bold.ttf"),
    poppinsmedium: require("../assets/fonts/poppins/Poppins-Medium.ttf"),
    poppinsregular: require("../assets/fonts/poppins/Poppins-Regular.ttf"),
    robotoblack: require("../assets/fonts/roboto/Roboto-Black.ttf"),
    robotobold: require("../assets/fonts/roboto/Roboto-Bold.ttf"),
    robotomedium: require("../assets/fonts/roboto/Roboto-Medium.ttf"),
    robotoregular: require("../assets/fonts/roboto/Roboto-Regular.ttf"),
    robotothin: require("../assets/fonts/roboto/Roboto-Thin.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
      setIsLoaded(true);
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const showAnimated = !isLoaded || !sPlashAnimationFinished;
  if (showAnimated) {
    return (
      <Animation setSPlashAnimationFinished={setSPlashAnimationFinished} />
    );
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

  const tokenCache = {
    async getToken(key: string) {
      try {
        const item = await SecureStore.getItemAsync(key);
        if (item) {
          console.log(`${key} was used 🔐 \n`);
        } else {
          console.log("No values stored under key: " + key);
        }
        return item;
      } catch (error) {
        console.error("SecureStore get item error: ", error);
        await SecureStore.deleteItemAsync(key);
        return null;
      }
    },
    async saveToken(key: string, value: string) {
      try {
        return SecureStore.setItemAsync(key, value);
      } catch (err) {
        return;
      }
    },
  };

  if (!publishableKey) {
    throw new Error(
      "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
    );
  }

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack>
            <Stack.Screen name="(home)" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen
              name="(onboarding)"
              options={{ headerShown: false }}
            />
            <Stack.Screen name="modal" options={{ presentation: "modal" }} />
          </Stack>
        </ThemeProvider>
      </GestureHandlerRootView>
    </ClerkProvider>
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
      style={{
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        backgroundColor: "#000",
      }}
    >
      <LottieView
        onAnimationFinish={(isCanceled) => {
          if (!isCanceled) {
            setSPlashAnimationFinished(true);
          }
        }}
        autoPlay
        loop={false}
        style={{
          width: "100%",
          aspectRatio: 1,
          backgroundColor: "#000",
        }}
        source={require("../assets/animations/lottie.json")}
      />
    </Animated.View>
  );
};
