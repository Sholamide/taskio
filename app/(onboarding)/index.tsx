import { SafeAreaView, Text, View } from "@/components/Themed";
import React from "react";
import { StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function OnboardingScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View>
        <Text>Onboarding</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
