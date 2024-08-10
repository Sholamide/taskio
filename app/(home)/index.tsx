import { Pressable, StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { Link, Stack } from "expo-router";
import { SignedIn, SignedOut, useAuth, useUser } from "@clerk/clerk-expo";
import Colors from "@/constants/Colors";

export default function TabOneScreen() {
  const { user } = useUser();
  const { signOut } = useAuth();

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <View>
        <SignedIn>
          <Text style={styles.title}>
            You are logged in as {user?.emailAddresses[0].emailAddress}
          </Text>
          <Pressable
            style={{backgroundColor:Colors.light.secondary, marginVertical:10, borderRadius:8, padding:10}}
            onPress={() => signOut({ redirectUrl: "/(auth)sign-up" })}
          >
            <Text style={{textAlign:'center'}}>sign out</Text>
          </Pressable>
        </SignedIn>
        <SignedOut>
          <Link href={"/(auth)/sign-in"}>
            <Text>Sign In</Text>
          </Link>
          <Link href={"/(auth)/sign-up"}>
            <Text>Sign Up</Text>
          </Link>
        </SignedOut>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
