import React from "react";
import { Link } from "expo-router";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import {
  SafeAreaView,
  Text,
  TextInput,
  View,
} from "@/components/Themed";
import Colors from "@/constants/Colors";

const SignInScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text
          lightColor={Colors.light.primary}
          darkColor={Colors.dark.primary}
          style={styles.headerText}
        >
          AIKI
        </Text>
        <View style={styles.introWrapper}>
          <Text
            lightColor={Colors.light.secondary}
            darkColor={Colors.dark.secondary}
            style={styles.introHeader}
          >
            Welcome
          </Text>
          <Text
            lightColor={Colors.light.text}
            darkColor={Colors.dark.text}
            style={styles.introSubtext}
          >
            Sign in to continue!
          </Text>
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={[styles.loginWrapper]}>
              <TextInput
                lightColor={Colors.light.text}
                darkColor={Colors.dark.text}
                placeholder="Email"
                style={styles.input}
              />
              <TextInput
                lightColor={Colors.light.text}
                darkColor={Colors.dark.text}
                placeholder="Password"
                style={styles.input}
              />
              <Pressable
                onPress={() => {
                  Alert.alert("You clicked on forgot password");
                }}
                style={styles.forgotPasswordPressable}
              >
                <Text
                  lightColor={Colors.light.primary}
                  darkColor={Colors.dark.primary}
                  style={styles.forgotPassword}
                >
                  Forgot Password?
                </Text>
              </Pressable>

              <Link
                style={{
                  marginTop: 30,
                  justifyContent: "center",
                  alignSelf: "center",
                }}
                href={"/(tabs)"}
              >
                <View style={styles.signinwrapper}>
                  <Text style={styles.signin}> Sign in</Text>
                </View>
              </Link>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        <View style={styles.footer}>
          <Link href="/signup">
            <Text>
              Don't have an account?,&nbsp;
              <Text
                lightColor={Colors.light.primary}
                darkColor={Colors.dark.primary}
              >
                Sign up!
              </Text>
            </Text>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  wrapper: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 80,
    paddingHorizontal: 15,
  },

  headerText: {
    fontSize: 40,
    letterSpacing: 10,
    fontWeight: "900",
  },
  introWrapper: {
    paddingVertical: 60,
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

  loginWrapper: {
    paddingVertical: 30,
    paddingHorizontal: 10,
  },

  image: {
    flex: 1,
    justifyContent: "center",
    maxHeight: "auto",
  },

  input: {
    height: 50,
    margin: 12,
    width: 360,
    borderWidth: 0.2,
    padding: 10,
    borderRadius: 5,
  },

  forgotPasswordPressable: {
    alignSelf: "flex-end",
    marginRight: 8,
  },

  forgotPassword: {
    fontSize: 14,
    fontWeight: "600",
  },

  signinwrapper: {
    backgroundColor: Colors.light.secondary,
    width: 350,
    padding: 15,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },

  signin: {
    fontSize: 14,
  },

  footer: {
    marginTop: 15,
  },

  footerButton: {
    paddingVertical: 20,
  },
});
