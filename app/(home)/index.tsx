import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";

import { Text, View } from "@/components/Themed";
import { Link, Stack } from "expo-router";
import { SignedIn, SignedOut, useAuth, useUser } from "@clerk/clerk-expo";
import Colors from "@/constants/Colors";
import { FontAwesome5 } from "@expo/vector-icons";
import { mockFeaturedTasks } from "@/constants";
import FeaturedTaskCard from "@/components/cards/featured-task-card";
import SuggestionCard from "@/components/cards/suggestions-card";

export default function HomeScreen() {
  const { user } = useUser();
  const { signOut } = useAuth();

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <ScrollView style={styles.wrapper}>
        <View style={styles.header}>
          <View style={styles.headerleft}>
            <Text style={styles.headerTitle}>Hello {user?.firstName},</Text>
            <Text style={styles.headerPunchline}>
              Task smarter, not harder ✨
            </Text>
          </View>
          <View>
            <Image
              style={{ width: 40, height: 40, borderRadius: 50 }}
              src={user?.imageUrl}
            />
          </View>
        </View>
        <View style={styles.featured}>
          <Text style={{ fontFamily: "poppinsbold" }}>Featured Tasks</Text>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={mockFeaturedTasks}
            renderItem={({ item }) => <FeaturedTaskCard task={item} />}
            keyExtractor={(task) => task.id}
          />
        </View>
        <View style={styles.featured}>
          <Text style={{ fontFamily: "poppinsbold" }}>Suggestions for you</Text>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={mockFeaturedTasks}
            renderItem={({ item }) => <SuggestionCard task={item} />}
            keyExtractor={(task) => task.id}
          />
        </View>
        <View style={styles.featured}>
          <Text style={{ fontFamily: "poppinsbold" }}>Categories</Text>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={mockFeaturedTasks}
            renderItem={({ item }) => <SuggestionCard task={item} />}
            keyExtractor={(task) => task.id}
          />
        </View>
        {/* <SignedIn>
          <Text style={styles.title}>
            You are logged in as {user?.emailAddresses[0].emailAddress}
          </Text>
          <Text>{user?.firstName}</Text>
          <Text>{user?.lastName}</Text>

          <Pressable
            style={{
              backgroundColor: Colors.light.secondary,
              marginVertical: 10,
              borderRadius: 8,
              padding: 10,
            }}
            onPress={() => signOut({ redirectUrl: "/(auth)sign-up" })}
          >
            <Text style={{ textAlign: "center" }}>sign out</Text>
          </Pressable>
        </SignedIn> */}
        {/* <Pressable
          style={{
            backgroundColor: Colors.light.secondary,
            marginVertical: 50,
            borderRadius: 8,
            padding: 10,
          }}
          onPress={() => signOut({ redirectUrl: "/(auth)sign-up" })}
        >
          <Text style={{ textAlign: "center" }}>sign out</Text>
        </Pressable> */}
        <SignedOut>
          <Link href={"/(auth)/sign-in"}>
            <Text>Sign In</Text>
          </Link>
          <Link href={"/(auth)/sign-up"}>
            <Text>Sign Up</Text>
          </Link>
        </SignedOut>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  wrapper: {
    padding: 20,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerleft: {
    display: "flex",
    alignItems: "flex-start",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "poppinsblack",
  },
  headerPunchline: {
    fontSize: 12,
    fontWeight: "500",
    fontFamily: "poppinsregular",
  },
  featured: {
    marginTop: 20,
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
