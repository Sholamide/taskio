import { SafeAreaView, Text, View } from "../../components/Themed";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { onboardingSteps } from "../../constants";
import Colors from "../../constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import {
  Directions,
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";
import Animated, {
  BounceIn,
  FadeOut,
  SlideInRight,
  SlideOutLeft,
} from "react-native-reanimated";
import { router } from "expo-router";

export default function OnboardingScreen() {
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
    router.replace("/(auth)");
  };

  const swipes = Gesture.Simultaneous(
    Gesture.Fling().runOnJS(true).direction(Directions.RIGHT).onEnd(onBack),
    Gesture.Fling().runOnJS(true).direction(Directions.LEFT).onEnd(onContinue)
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      <GestureDetector gesture={swipes}>
        <Animated.View key={data.id}>
          <View style={styles.indicatorContainer}>
            {onboardingSteps.map((step: any, index: number) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  {
                    backgroundColor:
                      index == screenIndex
                        ? Colors.light.primary
                        : Colors.light.text,
                  },
                ]}
              />
            ))}
          </View>
          <View style={styles.onboardingContainer}>
            <Animated.View style={styles.image}>
              <MaterialIcons
                name="create-new-folder"
                size={120}
                color={Colors.light.secondary}
              />
            </Animated.View>
            <View style={styles.content}>
              <Text style={styles.contentTitle}>{data.title}</Text>
              <Text style={styles.contentSubtitle}>{data.subtitle}</Text>
            </View>
          </View>
        </Animated.View>
      </GestureDetector>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  indicatorContainer: {
    paddingTop: 20,
    flexDirection: "row",
    gap: 5,
    marginHorizontal: "auto",
  },

  indicator: {
    backgroundColor: "gray",
    width: 100,
    height: 5,
    borderRadius: 10,
  },
  onboardingContainer: {
    marginTop: 120,
    justifyContent: "center",
    padding: 15,
  },
  image: {
    marginTop: 40,
    marginHorizontal: "auto",
  },

  content: {
    marginTop: 80,
    padding: 12,
  },

  contentTitle: {
    fontSize: 40,
    color: Colors.light.primary,
    marginBottom: 12,
  },
  contentSubtitle: {
    fontSize: 14,
  },
});
