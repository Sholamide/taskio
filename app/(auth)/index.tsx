import React from "react";
import { Link, useRouter } from "expo-router";
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
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import Colors from "../../constants/Colors";
import { useSignIn } from "@clerk/clerk-expo";
import { Feather } from "@expo/vector-icons";
import GoogleAuth from "@/components/google-auth";

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
  const [signInForm, setSignInForm] = React.useState({
    emailAddress: "",
    password: "",
  });
  const onSignInPress = React.useCallback(async () => {
    setLoading(true);
    if (!isLoaded) {
      return;
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: signInForm.emailAddress,
        password: signInForm.password,
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
      Alert.alert("Error", err.errors[0].longMessage);
      setLoading(false);
    }
  }, [isLoaded, signInForm.emailAddress, signInForm.password]);

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
          <GoogleAuth title="Log In with Google" />
        </View>
        <View style={{ padding: 10 }}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View
                style={{
                  marginVertical: 10,
                  width: "100%",
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    marginBottom: 6,
                  }}
                >
                  Email
                </Text>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    position: "relative",
                    backgroundColor: "#191818",
                    borderRadius: 10,
                    padding: 5,
                    borderColor: "#f5f5f5",
                    borderWidth: StyleSheet.hairlineWidth,
                  }}
                >
                  <Feather
                    style={{ marginLeft: 4 }}
                    name="mail"
                    size={24}
                    color={Colors.light.secondary}
                  />
                  <TextInput
                    style={styles.input}
                    textContentType="emailAddress"
                    value={signInForm.emailAddress}
                    autoCapitalize="none"
                    lightColor={Colors.light.text}
                    darkColor={Colors.dark.text}
                    placeholder="Enter email"
                    onChangeText={(value) =>
                      setSignInForm({ ...signInForm, emailAddress: value })
                    }
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View
                style={{
                  marginVertical: 10,
                  width: "100%",
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    marginBottom: 6,
                  }}
                >
                  Password
                </Text>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    position: "relative",
                    backgroundColor: "#191818",
                    borderRadius: 10,
                    padding: 5,
                    borderColor: "#f5f5f5",
                    borderWidth: StyleSheet.hairlineWidth,
                  }}
                >
                  <Feather
                    style={{ marginLeft: 4 }}
                    name="lock"
                    size={24}
                    color={Colors.light.secondary}
                  />
                  <TextInput
                    style={styles.input}
                    textContentType="password"
                    secureTextEntry={true}
                    value={signInForm.password}
                    autoCapitalize="none"
                    lightColor={Colors.light.text}
                    darkColor={Colors.dark.text}
                    placeholder="Enter password"
                    onChangeText={(value) =>
                      setSignInForm({ ...signInForm, password: value })
                    }
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
          <TouchableOpacity
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
          </TouchableOpacity>

          <TouchableOpacity
            disabled={loading}
            onPress={onSignInPress}
            style={[
              {
                backgroundColor: loading ? "#963c34" : Colors.light.secondary,
              },
              styles.signinwrapper,
            ]}
          >
            <Feather name="log-in" size={20} color={Colors.light.primary} />
            <Text style={styles.signin}> Sign In</Text>
            {loading && <ActivityIndicator />}
          </TouchableOpacity>
          <Link
            style={{
              textAlign: "center",
              color: "#fff",
              marginTop: 30,
              fontSize: 14,
            }}
            href={"/(auth)/sign-up"}
          >
            Don't have an account?,&nbsp;
            <Text
              lightColor={Colors.light.primary}
              darkColor={Colors.dark.primary}
            >
              Sign up!
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
    padding: 20,
  },

  headerText: {
    fontSize: 40,
    letterSpacing: 10,
    fontWeight: "900",
    textAlign: "center",
  },
  introWrapper: {
    marginTop: 10,
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

  input: {
    borderRadius: 50,
    padding: 10,
    flex: 1,
    textAlign: "left",
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
    width: "100%",
    padding: 15,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },

  signin: {
    fontSize: 14,
    fontFamily: "poppinsbold",
    color: "#000",
  },
});
