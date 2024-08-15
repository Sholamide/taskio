import React from "react";
import { useRouter } from "expo-router";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "../../components/Themed";
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import Colors from "../../constants/Colors";
import { useOAuth, useSignIn } from "@clerk/clerk-expo";
import { FontAwesome5 } from "@expo/vector-icons";

const useWarmUpBrowser = () => {
  React.useEffect(() => {
    // Warm up the android browser to improve UX
    // https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

const SignInScreen = () => {
  useWarmUpBrowser();

  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [loading, setLoading] = React.useState(false);
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [signinError, setSigninError] = React.useState(false);
  const [signinErrorMessage, setSigninErrorMessage] = React.useState("");

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const handleOAuth = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow({
          redirectUrl: Linking.createURL("/dashboard", { scheme: "myapp" }),
        });

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  const onSignInPress = React.useCallback(async () => {
    setLoading(true);
    if (!isLoaded) {
      return;
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
        setLoading(false);
      } else {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        console.error("attempt error", JSON.stringify(signInAttempt, null, 2));
        setLoading(false);
      }
    } catch (err: any) {
      setSigninError(true);
      setSigninErrorMessage(err.errors[0].message);
      // console.error("sign in error", JSON.stringify(err, null, 2));
      setLoading(false);
    }
  }, [isLoaded, emailAddress, password]);

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
        <View style={{ alignItems: "center" }}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 10,
              gap: 50,
            }}
          >
            <TouchableOpacity onPress={handleOAuth}>
              <FontAwesome5
                name="google"
                size={50}
                color={Colors.light.secondary}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ alignItems: "center" }}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
              marginVertical: 10,
            }}
          >
            <View
              style={{
                borderWidth: StyleSheet.hairlineWidth,
                width: "40%",
                borderColor: "#5a5757",
              }}
            />
            <Text
              lightColor={Colors.light.primary}
              darkColor={Colors.dark.primary}
            >
              or
            </Text>
            <View
              style={{
                borderWidth: StyleSheet.hairlineWidth,
                width: "40%",
                borderColor: "#5a5757",
              }}
            />
          </View>
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={[styles.loginWrapper]}>
              <TextInput
                value={emailAddress}
                autoCapitalize="none"
                lightColor={Colors.light.text}
                darkColor={Colors.dark.text}
                placeholder="Email..."
                style={styles.input}
                onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
              />
              <TextInput
                value={password}
                lightColor={Colors.light.text}
                darkColor={Colors.dark.text}
                placeholder="Password..."
                style={styles.input}
                secureTextEntry={true}
                onChangeText={(password) => setPassword(password)}
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

              <Pressable
                disabled={loading}
                onPress={onSignInPress}
                style={[
                  {
                    backgroundColor: loading
                      ? "#963c34"
                      : Colors.light.secondary,
                  },
                  styles.signinwrapper,
                ]}
              >
                <Text style={styles.signin}> Sign in</Text>
                {loading && <ActivityIndicator />}
              </Pressable>
              {signinError && (
                <Text
                  lightColor={Colors.light.crimsonRed}
                  darkColor={Colors.dark.crimsonRed}
                  style={{
                    textAlign: "center",
                    marginTop: 10,
                    fontSize: 16,
                    fontWeight: "400",
                  }}
                >
                  {signinErrorMessage}
                </Text>
              )}
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        <View style={styles.footer}>
          <Pressable
            onPress={() => {
              router.push("/(auth)/sign-up");
            }}
          >
            <Text>
              Don't have an account?,&nbsp;
              <Text
                lightColor={Colors.light.primary}
                darkColor={Colors.dark.primary}
              >
                Sign up!
              </Text>
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
    paddingVertical: 10,
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
    display: "flex",
    flexDirection: "row",
    gap: 8,
    marginTop: 30,
    width: 350,
    padding: 15,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },

  signin: {
    fontSize: 16,
  },

  footer: {
    marginTop: 15,
  },

  footerButton: {
    paddingVertical: 20,
  },
});
