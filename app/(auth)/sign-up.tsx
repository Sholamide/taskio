import React from "react";
import { Link, useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useSignUp } from "@clerk/clerk-expo";
import Colors from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import { doc, setDoc } from "firebase/firestore";
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ReactNativeModal } from "react-native-modal";
import GoogleAuth from "@/components/google-auth";
import { db } from "@/config/firebase/firebase-config";
import useStore from "@/store/user-store";

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
  const [showSuccessModal, setShowSuccessModal] = React.useState(false);
  const { setActiveUser } = useStore();
  const [loading, setLoading] = React.useState(false);

  //sign up form values
  const [signUpForm, setSignUpForm] = React.useState({
    username: "",
    emailAddress: "",
    password: "",
    confirmPassword: "",
  });

  //verification form values
  const [verification, setVerification] = React.useState({
    state: "default",
    error: "",
    code: "",
  });

  const onSignUpPress = async () => {
    setLoading(true);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(signUpForm.emailAddress);

    if (!isLoaded) {
      setLoading(false);
      return;
    }

    if (signUpForm.password !== signUpForm.confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      setLoading(false);
      return;
    }

    if (signUpForm.username === "") {
      Alert.alert("Error", "Username required");
      setLoading(false);
      return;
    }

    if (!isValidEmail) {
      Alert.alert("Error", "Invalid email");
      setLoading(false);
      return;
    }

    try {
      await signUp.create({
        username: signUpForm.username,
        emailAddress: signUpForm.emailAddress,
        password: signUpForm.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setLoading(false);
      setVerification({
        ...verification,
        state: "pending",
      });
    } catch (err: any) {
      setLoading(false);
      Alert.alert("Error", err.errors[0].message);
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      // console.error(JSON.stringify(err, null, 2));
    }
  };

  const onPressVerify = async () => {
    setLoading(true);

    if (!isLoaded) {
      setLoading(false);
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        setLoading(false);

        setVerification({
          ...verification,
          state: "success",
        });

        // generate user data on firebase
        const userRef = doc(db, "users", completeSignUp.createdUserId!);

        const newUserData = {
          username: signUpForm.username,
          clerkUserId: completeSignUp.createdUserId!,
          email: signUpForm.emailAddress,
          image: "",
          tasks: [],
          projects: [],
        };

        await setDoc(userRef, newUserData);
        setActiveUser(newUserData);
      }
    } catch (err: any) {
      console.log("error", err);
      setLoading(false);
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      setVerification({
        ...verification,
        error: "Verification failed. Please try again.",
        state: "pending",
      });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.introWrapper}>
          <Text style={styles.introHeader}>Create Account</Text>
          <Text style={styles.introSubtext}>Sign up to get started</Text>
          <GoogleAuth title="Sign Up with Google" />
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
            <Text>or</Text>
            <View
              style={{
                borderWidth: StyleSheet.hairlineWidth,
                width: "40%",
                borderColor: "#5a5757",
              }}
            />
          </View>
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
                  Username
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
                    name="user"
                    size={24}
                    color={Colors.light.secondary}
                  />
                  <TextInput
                    style={styles.input}
                    textContentType="username"
                    value={signUpForm.username}
                    autoCapitalize="none"
                    placeholder="Enter username"
                    onChangeText={(value) =>
                      setSignUpForm({ ...signUpForm, username: value })
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
                    value={signUpForm.emailAddress}
                    autoCapitalize="none"
                    placeholder="Enter email"
                    onChangeText={(value) =>
                      setSignUpForm({ ...signUpForm, emailAddress: value })
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
                    value={signUpForm.password}
                    autoCapitalize="none"
                    secureTextEntry={true}
                    placeholder="Enter password"
                    onChangeText={(value) =>
                      setSignUpForm({ ...signUpForm, password: value })
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
                  Confirm Password
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
                    value={signUpForm.confirmPassword}
                    autoCapitalize="none"
                    secureTextEntry={true}
                    placeholder="Confirm password"
                    onChangeText={(value) =>
                      setSignUpForm({ ...signUpForm, confirmPassword: value })
                    }
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
          <TouchableOpacity
            disabled={loading}
            onPress={onSignUpPress}
            style={[
              {
                backgroundColor: loading ? "#963c34" : Colors.light.secondary,
              },
              styles.signupButtonWrapper,
            ]}
          >
            <Feather name="log-in" size={20} color={Colors.light.primary} />
            <Text style={styles.signupButton}> Sign Up</Text>
            {loading && <ActivityIndicator />}
          </TouchableOpacity>
          <Link
            style={{
              textAlign: "center",
              color: "#fff",
              marginTop: 30,
              fontSize: 14,
            }}
            href={"/(auth)"}
          >
            Already have an account?,&nbsp;
            <Text>Sign in!</Text>
          </Link>
        </View>
      </View>
      <ReactNativeModal
        isVisible={verification.state === "pending"}
        onModalHide={() => {
          if (verification.state === "success") {
            setShowSuccessModal(true);
          }
        }}
      >
        <View
          style={{
            paddingHorizontal: 20,
            paddingVertical: 10,
            height: 300,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              marginBottom: 10,
              fontSize: 20,
              color: Colors.light.primary,
              fontFamily: "poppinsmedium",
            }}
          >
            Verification
          </Text>
          <Text
            style={{
              marginBottom: 10,
            }}
          >
            We've sent a verification code to {signUpForm.emailAddress}.
          </Text>
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
                  Code
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
                    keyboardType="numeric"
                    style={styles.input}
                    textContentType="username"
                    value={verification.code}
                    placeholder="12345"
                    onChangeText={(value) =>
                      setVerification({ ...verification, code: value })
                    }
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
          {verification.error && (
            <Text style={{ color: Colors.light.crimsonRed, marginTop: 5 }}>
              {verification.error}
            </Text>
          )}
          <TouchableOpacity
            disabled={loading}
            onPress={onPressVerify}
            style={[
              {
                backgroundColor: loading ? "#963c34" : Colors.light.secondary,
              },
              styles.signupButtonWrapper,
            ]}
          >
            <Text style={styles.signupButton}> VERIFY CODE</Text>
            {loading && <ActivityIndicator />}
          </TouchableOpacity>
        </View>
      </ReactNativeModal>
      <ReactNativeModal isVisible={showSuccessModal}>
        <View
          style={{
            paddingHorizontal: 20,
            paddingVertical: 10,
            height: 300,
            gap: 10,
          }}
        >
          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
              padding: 10,
              backgroundColor: "#fff",
              alignSelf: "center",
              borderRadius: 50,
            }}
          >
            <Feather name="check" size={24} color={Colors.light.primary} />
          </TouchableOpacity>
          <Text
            style={{
              textAlign: "center",
              fontFamily: "poppinsbold",
              color: Colors.light.primary,
            }}
          >
            Verified
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontFamily: "poppinsregular",
            }}
          >
            You have successfully verified your account.
          </Text>
          <TouchableOpacity
            disabled={loading}
            onPress={() => {
              router.push("/(root)/(tabs)/home");
              setShowSuccessModal(false);
            }}
            style={[
              {
                backgroundColor: Colors.light.primary,
              },
              styles.signupButtonWrapper,
            ]}
          >
            <Text style={styles.signupButton}> GO HOME</Text>
            {loading && <ActivityIndicator />}
          </TouchableOpacity>
        </View>
      </ReactNativeModal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  wrapper: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  introWrapper: {
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginTop: 20,
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
    borderRadius: 50,
    padding: 10,
    flex: 1,
    textAlign: "left",
  },
  signupButtonWrapper: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
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
