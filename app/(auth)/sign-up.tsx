import React from "react";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import {
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
  TouchableOpacity,
  View,
} from "@/components/Themed";
import Colors from "@/constants/Colors";
import { useOAuth, useSignUp } from "@clerk/clerk-expo";
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

WebBrowser.maybeCompleteAuthSession();

export default function SignUpScreen() {
  useWarmUpBrowser();

  const { isLoaded, signUp, setActive } = useSignUp();

  const router = useRouter();

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");
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

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    if (password !== confirmPassword) {
      setSigninErrorMessage("Passwords do not match");
      return;
    }

    try {
      await signUp.create({
        // firstName,
        // lastName,
        username,
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (err: any) {
      setSigninError(true);
      if (err.errors.length > 1) {
        setSigninErrorMessage("missing fields required");
      }
      setSigninErrorMessage(err.errors[0].message);

      // setSigninErrorMessage(err.errors[0].message);
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      // console.error(JSON.stringify(err, null, 2));
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.replace("/(home)/");
        
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err.errors.message, null, 2));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {!pendingVerification && (
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
          <View style={{ alignItems: "center" }}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 20,
                gap: 50,
              }}
            >
              {/* <TouchableOpacity onPress={handleOAuth}>
                <FontAwesome5
                  name="facebook"
                  size={50}
                  color={Colors.light.secondary}
                />
              </TouchableOpacity> */}
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
                marginVertical: 20,
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
              <View style={styles.signupWrapper}>
                {/* username */}
                <TextInput
                  autoCapitalize="none"
                  value={username}
                  onChangeText={(username) => setUsername(username)}
                  lightColor={Colors.light.text}
                  darkColor={Colors.dark.text}
                  placeholder="Username..."
                  style={styles.input}
                />

                {/* firstname */}
                {/* <TextInput
                  autoCapitalize="none"
                  value={firstName}
                  onChangeText={(firstName) => setFirstName(firstName)}
                  lightColor={Colors.light.text}
                  darkColor={Colors.dark.text}
                  placeholder="First Name..."
                  style={styles.input}
                /> */}

                {/* lastname */}
                {/* <TextInput
                  autoCapitalize="none"
                  value={lastName}
                  onChangeText={(lastName) => setLastName(lastName)}
                  lightColor={Colors.light.text}
                  darkColor={Colors.dark.text}
                  placeholder="Last Name..."
                  style={styles.input}
                /> */}

                {/* email address */}
                <TextInput
                  autoCapitalize="none"
                  value={emailAddress}
                  onChangeText={(email) => setEmailAddress(email)}
                  lightColor={Colors.light.text}
                  darkColor={Colors.dark.text}
                  placeholder="Email"
                  style={styles.input}
                />

                {/* password */}
                <TextInput
                  value={password}
                  onChangeText={(password) => setPassword(password)}
                  secureTextEntry={true}
                  keyboardType="visible-password"
                  lightColor={Colors.light.text}
                  darkColor={Colors.dark.text}
                  placeholder="password..."
                  style={styles.input}
                />

                {/* confirm password */}
                <TextInput
                  value={confirmPassword}
                  lightColor={Colors.light.text}
                  secureTextEntry={true}
                  darkColor={Colors.dark.text}
                  placeholder="confirm password..."
                  style={styles.input}
                  onChangeText={(confirmPassword) =>
                    setConfirmPassword(confirmPassword)
                  }
                />
                <Pressable
                  style={styles.signupButtonWrapper}
                  onPress={onSignUpPress}
                >
                  <Text
                    lightColor={Colors.light.text}
                    darkColor={Colors.dark.text}
                    style={styles.signupButton}
                  >
                    Sign Up
                  </Text>
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

                <View style={{ alignItems: "center", marginTop: 30 }}>
                  <Pressable
                    onPress={() => {
                      router.push("/(auth)");
                    }}
                  >
                    <Text>
                      Already have an account?,&nbsp;
                      <Text
                        lightColor={Colors.light.primary}
                        darkColor={Colors.dark.primary}
                      >
                        Sign in!
                      </Text>
                    </Text>
                  </Pressable>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </View>
      )}
      {pendingVerification && (
        <View style={styles.container}>
          <View style={styles.wrapper}>
            <TextInput
              value={code}
              placeholder="Enter verification code..."
              style={styles.input}
              onChangeText={(code) => setCode(code)}
            />
            <Pressable style={styles.verifyButton} onPress={onPressVerify}>
              <Text style={styles.verifytext}>Verify email</Text>
            </Pressable>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  wrapper: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    flex: 1,
  },
  introWrapper: {
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
    paddingVertical: 10,
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
  verifyButton: {
    width: "100%",
    backgroundColor: Colors.light.secondary,
    padding: 10,
    borderRadius: 10,
  },

  verifytext: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "500",
  },
});
