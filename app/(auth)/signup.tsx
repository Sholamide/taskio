import React from "react";
import { SafeAreaView, Text, TextInput, View } from "../../components/Themed";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import Colors from "../../constants/Colors";
import { Link } from "expo-router";

const SignUpScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.introWrapper}>
          <Text
            lightColor={Colors.light.secondary}
            darkColor={Colors.dark.secondary}
            style={styles.introHeader}
          >
            Create Account
          </Text>
          <Text
            lightColor={Colors.light.text}
            darkColor={Colors.dark.text}
            style={styles.introSubtext}
          >
            Sign up to get started
          </Text>
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.signupWrapper}>
              <TextInput
                lightColor={Colors.light.text}
                darkColor={Colors.dark.text}
                placeholder="Username"
                style={styles.input}
              />
              <TextInput
                lightColor={Colors.light.text}
                darkColor={Colors.dark.text}
                placeholder="Email"
                style={styles.input}
              />
              <TextInput
                keyboardType="number-pad"
                lightColor={Colors.light.text}
                darkColor={Colors.dark.text}
                placeholder="Phone Number"
                style={styles.input}
              />
              <TextInput
                keyboardType="visible-password"
                lightColor={Colors.light.text}
                darkColor={Colors.dark.text}
                placeholder="Password"
                style={styles.input}
              />
              <TextInput
                lightColor={Colors.light.text}
                darkColor={Colors.dark.text}
                placeholder="Confirm Password"
                style={styles.input}
              />
              <Pressable
                style={styles.signupButtonWrapper}
                onPress={() => {
                  Alert.alert("You clicked on sign up");
                }}
              >
                <Text
                  lightColor={Colors.light.text}
                  darkColor={Colors.dark.text}
                  style={styles.signupButton}
                >
                  Sign Up
                </Text>
              </Pressable>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        <View>
          <Link href="/(auth)">
            <Text>
              Already have an account?,&nbsp;
              <Text
                lightColor={Colors.light.primary}
                darkColor={Colors.dark.primary}
              >
                Sign in!
              </Text>
            </Text>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  introWrapper: {
    paddingVertical: 20,
    paddingHorizontal: 30,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  introHeader: {
    fontSize: 30,
    fontWeight: "600",
  },
  introSubtext: {
    fontSize: 20,
    fontWeight: "400",
  },
  signupWrapper: {
    paddingVertical: 30,
    paddingHorizontal: 10,
  },
  input: {
    height: 50,
    margin: 12,
    width: 360,
    borderWidth: 0.2,
    padding: 10,
    borderRadius: 5,
  },
  signupButtonWrapper: {
    backgroundColor: Colors.light.secondary,
    marginTop: 20,
    marginHorizontal: 10,
    padding: 15,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  signupButton: {
    fontSize: 14,
  },
  text: {
    fontSize: 16,
  },
});
