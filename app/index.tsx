import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import HomeScreen from "./(tabs)/HomeScreen";
import Colors from "@/constants/Colors";
import Onboarding from "./onboarding";

const App = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState<null | boolean>(null);
  useEffect(() => {
    async function checkFirstLaunch() {
      try {
        const value = await AsyncStorage.getItem("isFirstLaunch");
        if (value === null) {
          setIsFirstLaunch(true);
          // await AsyncStorage.setItem("isFirstLaunch", "false"); // Set to false after first launch
        } else {
          // setIsFirstLaunch(false);
        }
      } catch (error) {
        console.error("Error storing data in AsyncStorage:", error);
      }
    }

    checkFirstLaunch();
  }, []);

  {
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.light.white }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack.Screen />
        {isFirstLaunch ? <Onboarding /> : <HomeScreen />}
      </GestureHandlerRootView>
    </SafeAreaView>
    // <>
    //
    // </>
  );
};

export default App;

const styles = StyleSheet.create({});
