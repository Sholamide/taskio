import React from "react";
import { SafeAreaView, Text, View } from "@/components/Themed";
import { StyleSheet } from "react-native";

const SignUpScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.text}>Sign Up Screen</Text>
      </View>
    </SafeAreaView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor:"red",
    borderStyle:"solid",
    borderWidth:1
  },
  wrapper: {
    justifyContent: "center",
    alignContent: "center",
  },
  text: {
    fontSize: 16,
  },
});
