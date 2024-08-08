import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import colors from "../constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, router } from "expo-router";

import Animated, {
  FadeOut,
  SlideInRight,
  SlideOutLeft,
} from "react-native-reanimated";

import {
  Directions,
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

const onboardingSteps = [
  {
    id: "1",
    title: "Create Tasks with Ease",
    subtitle: "Quickly set up tasks and describe the work you need done",
    image: require("../assets/onboading/image1.jpg"),
  },
  {
    id: "2",
    title: "Find the Right Help",
    subtitle:
      "Post tasks and let others accept them, so you don't have to search for help",
    image: require("../assets/onboading/image2.jpg"),
  },
  {
    id: "3",
    title: "Track Progress Effortlessly",
    subtitle:
      "Monitor task status and completion in real-time, all in one app.",
    image: require("../assets/onboading/image3.jpg"),
  },
];

const Onboarding = ({}) => {
  const [screenIndex, setScreenIndex] = useState(0);
  const data = onboardingSteps[screenIndex];

  const onContinue = () => {
    const isLastScreen = screenIndex === onboardingSteps.length - 1;
    if (isLastScreen) {
      endOnboarding();
    } else {
      setScreenIndex(screenIndex + 1);
    }
  };

  const onBack = () => {
    const isFirstScreen = screenIndex === 0;
    if (isFirstScreen) {
      endOnboarding();
    } else {
      setScreenIndex(screenIndex - 1);
    }
  };

  const endOnboarding = async () => {
    await AsyncStorage.setItem("isFirstLaunch", "false");
    router.replace("./HomeScreen");
  };

  const swipes = Gesture.Simultaneous(
    Gesture.Fling().runOnJS(true).direction(Directions.RIGHT).onEnd(onBack),
    Gesture.Fling().runOnJS(true).direction(Directions.LEFT).onEnd(onContinue)
  );

  // const swipeNext = Gesture.Fling()
  //   .runOnJS(true)
  //   .direction(Directions.LEFT)
  //   .onEnd(onContinue);
  // const swipePrev = Gesture.Fling()
  //   .runOnJS(true)
  //   .direction(Directions.RIGHT)
  //   .onEnd(onBack);

  // const swipes = Gesture.Simultaneous(swipeNext, swipePrev);

  return (
    <GestureHandlerRootView>
      <SafeAreaView style={styles.container}>
        <Stack screenOptions={{ headerShown: false }} />
        
        <View style={styles.indicatorContainer}>
          {onboardingSteps.map((step: any, index: number) => (
            <View
              key={index}
              style={[
                styles.indicator,
                {
                  backgroundColor:
                    index == screenIndex ? colors.light.button : "grey",
                },
              ]}
            />
          ))}
        </View>

        {/* <GestureDetector gesture={swipes}>
          <View>
            <Animated.Image
              key={data.id}
              source={data.image}
              style={styles.image}
            />
            <View style={styles.textContainer}>
              <Animated.Text key={data.title} style={styles.title}>
                {data.title}
              </Animated.Text>
              <Animated.Text key={data.subtitle} style={styles.subtitle}>
                {data.subtitle}
              </Animated.Text>
            </View>
          </View>
        </GestureDetector> */}

        {/* <View style={styles.navigationContainer}>
          <Text onPress={endOnboarding}>Skip</Text>
          <Pressable onPress={onContinue} style={styles.nextContainer}>
            <Entypo name="chevron-right" size={24} color={colors.light.white} />
          </Pressable>
        </View> */}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center"
  },
  image: {
    width: 400,
    height: 400,
    resizeMode: "contain",
    backgroundColor: "#fff",
  },
  textContainer: {
    alignItems: "center",
    gap: 20,
  },
  title: {
    fontSize: 30,
    fontFamily: "notoBold",
  },
  subtitle: {
    fontSize: 15,
    fontFamily: "notoBold",
  },
  indicatorContainer: {
    flexDirection: "row",
    gap: 5,
  },
  indicator: {
    backgroundColor: "gray",
    width: 100,
    height: 5,
    borderRadius: 10,
  },
  navigationContainer: {
    flexDirection: "row",
    gap: 150,
    alignItems: "center",
  },
  nextContainer: {
    backgroundColor: colors.light.primary,
    padding: 15,
    borderRadius: 15,
  },
});
