import { SafeAreaView, Text, View } from "../../components/Themed";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { onboardingSteps } from "../../constants";
import Colors from "../../constants/Colors";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  Directions,
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";
import Animated, {
  Easing,
  FadeIn,
  FadeInDown,
  FadeInUp,
  FadeOut,
  FadeOutUp,
} from "react-native-reanimated";
import { Redirect, router } from "expo-router";

export default function OnboardingScreen() {
  // state handler for setting index of onboarding
  const [screenIndex, setScreenIndex] = useState(0);
  const data = onboardingSteps[screenIndex];

  //state handler for checking if user is just opening app for the first time
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);

  //function to check if user is just opening app for the first time
  const checkIsFirstLaunch = async () => {
    try {
      const value = await AsyncStorage.getItem("hasLaunched");
      if (value === null) {
        // First launch
        await AsyncStorage.setItem("hasLaunched", "true");
        setIsFirstLaunch(true);
      } else {
        // Not first launch
        setIsFirstLaunch(false);
      }
    } catch (error) {
      console.error("Error checking first launch: ", error);
    }
  };

  useEffect(() => {
    //function call in useEffect
    checkIsFirstLaunch();
  }, []);

  //function to toggle screen index
  const onContinue = () => {
    const isLastScreen = screenIndex === onboardingSteps.length - 1;
    if (isLastScreen) {
      endOnboarding();
    } else {
      setScreenIndex(screenIndex + 1);
    }
  };

  //function to toggle screen index
  const onBack = () => {
    const isFirstScreen = screenIndex === 0;
    if (isFirstScreen) {
      endOnboarding();
    } else {
      setScreenIndex(screenIndex - 1);
    }
  };

  //function to end onboarding
  const endOnboarding = async () => {
    await AsyncStorage.setItem("isFirstLaunch", "false");
    router.replace("/(auth)");
  };

  //gesture handler for handling swiping
  const swipes = Gesture.Simultaneous(
    Gesture.Fling().runOnJS(true).direction(Directions.RIGHT).onEnd(onBack),
    Gesture.Fling().runOnJS(true).direction(Directions.LEFT).onEnd(onContinue)
  );

  //check if it's first launch, if not, redirect to auth group
  if (!isFirstLaunch) {
    return <Redirect href="/(home)/" />;
  }

  //onboarding screen
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      <GestureDetector gesture={swipes}>
        <Animated.View
          key={data.id}
          entering={FadeIn.duration(500).easing(Easing.ease)}
          exiting={FadeOut.duration(500).easing(Easing.ease)}
          style={styles.pageContent}
        >
          <View style={styles.indicatorContainer}>
            {onboardingSteps.map((_, index: number) => (
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
          <Animated.View
            key={data.id}
            entering={FadeIn.duration(700).easing(Easing.ease)}
            exiting={FadeOut.duration(600).easing(Easing.ease)}
          >
            <FontAwesome5
              style={styles.image}
              name={data.icon}
              size={150}
              color={Colors.light.secondary}
            />
          </Animated.View>

          <View style={styles.footer}>
            <Animated.View
              key={data.id}
              entering={FadeInUp.springify()
                .damping(30)
                .mass(5)
                .stiffness(10)
                .overshootClamping(1)
                .restDisplacementThreshold(0.1)
                .restSpeedThreshold(5)}
              exiting={FadeOutUp.springify()
                .damping(30)
                .mass(5)
                .stiffness(10)
                .overshootClamping(1)
                .restDisplacementThreshold(0.1)
                .restSpeedThreshold(5)}
            >
              <Text
                lightColor={Colors.light.primary}
                darkColor={Colors.light.primary}
                style={styles.contentTitle}
              >
                {data.title}
              </Text>
            </Animated.View>

            <Animated.View
              entering={FadeInDown.springify()
                .damping(30)
                .mass(5)
                .stiffness(10)
                .overshootClamping(1)
                .restDisplacementThreshold(0.1)
                .restSpeedThreshold(5)}
              exiting={FadeOutUp.springify()
                .damping(30)
                .mass(5)
                .stiffness(10)
                .overshootClamping(1)
                .restDisplacementThreshold(0.1)
                .restSpeedThreshold(5)}
            >
              <Text
                lightColor={Colors.light.lightGray}
                darkColor={Colors.light.lightGray}
                style={styles.contentSubtitle}
              >
                {data.subtitle}
              </Text>
            </Animated.View>
            <Animated.View
              style={styles.buttonsRow}
              entering={FadeInDown.springify()
                .damping(30)
                .mass(1)
                .stiffness(30)
                .overshootClamping(1)
                .restDisplacementThreshold(0.1)
                .restSpeedThreshold(5)}
              exiting={FadeOutUp.springify()
                .damping(30)
                .mass(5)
                .stiffness(10)
                .overshootClamping(1)
                .restDisplacementThreshold(0.1)
                .restSpeedThreshold(5)}
            >
              <Pressable onPress={endOnboarding}>
                <Text
                  lightColor={Colors.dark.background}
                  darkColor={Colors.light.background}
                  style={styles.buttonText}
                >
                  Skip
                </Text>
              </Pressable>

              <Pressable
                onPress={onContinue}
                style={[
                  {
                    backgroundColor:
                      screenIndex === onboardingSteps.length - 1
                        ? Colors.light.secondary
                        : Colors.light.primary,
                  },
                  styles.button,
                ]}
              >
                <Text
                  lightColor={Colors.light.background}
                  darkColor={Colors.dark.background}
                  style={styles.buttonText}
                >
                  {screenIndex === onboardingSteps.length - 1
                    ? "Get Started"
                    : "Continue"}
                </Text>
              </Pressable>
            </Animated.View>
          </View>
        </Animated.View>
      </GestureDetector>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  pageContent: {
    padding: 20,
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
    alignSelf: "center",
    margin: 20,
    marginTop: 70,
  },

  footer: {
    marginTop: "auto",
  },

  contentTitle: {
    fontSize: 45,
    marginVertical: 20,
    fontWeight: "700",
    letterSpacing: 1,
  },
  contentSubtitle: {
    fontSize: 14,
    lineHeight: 28,
  },

  buttonsRow: {
    display: "flex",
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
  },
  button: {
    borderRadius: 50,
    alignItems: "center",
    flex: 1,
  },
  buttonText: {
    padding: 15,
    fontSize: 16,
    paddingHorizontal: 25,
  },
});
