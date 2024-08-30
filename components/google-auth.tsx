import { useOAuth } from "@clerk/clerk-expo";
import React from "react";
import * as Linking from "expo-linking";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";

const GoogleAuth = ({ title }: { title: string }) => {
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const handleOAuth = React.useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow({
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
  }, [startOAuthFlow]);

  return (
    <TouchableOpacity onPress={handleOAuth} style={styles.container}>
      <Image
        style={{
          height: 20,
          width: 20,
        }}
        source={require("../assets/icons/google.png")}
      />
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

export default GoogleAuth;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    gap: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#565454",
    padding: 10,
    borderRadius: 8,
  },
});
