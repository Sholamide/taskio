import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Touchable,
} from "react-native";

import { Text, TouchableOpacity, View } from "@/components/Themed";
import { Link, Stack } from "expo-router";
import { SignedOut, useAuth, useUser } from "@clerk/clerk-expo";
import FeaturedTaskCard from "@/components/cards/featured-task-card";
import SuggestionCard from "@/components/cards/suggestions-card";
import React, { useEffect } from "react";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db } from "@/config/firebase/firebase-config";
import getTaskCategories from "@/actions/categories/get-task-categories";
import CategoriesCard from "@/components/cards/task-categories-card";
import useStore from "@/store/store";
import Colors from "@/constants/Colors";
import { FontAwesome5 } from "@expo/vector-icons";

export default function HomeScreen() {
  const { user } = useUser();
  const {
    activeUser,
    categories,
    setCategories,
    featuredtasks,
    setFeaturedTasks,
    setActiveUser,
  } = useStore();
  const [userData, setUserData] = React.useState<any>(null);

  const { signOut } = useAuth();

  useEffect(() => {
    getTaskCategories();
    getFeaturedTasks();
    if (user) {
      handleUser();
    }
  }, [user]);

  const getTaskCategories = async () => {
    const taskCategories: any = [];

    const categoriesSnap = await getDocs(collection(db, "categories"));

    categoriesSnap.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      taskCategories.push(doc.data());
    });

    setCategories(taskCategories);
  };

  const getFeaturedTasks = async () => {
    const allFeaturedTask: any = [];

    const featuredTasksSnap = await getDocs(collection(db, "featuredtasks"));

    featuredTasksSnap.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      allFeaturedTask.push(doc.data());
    });

    setFeaturedTasks(allFeaturedTask);
  };

  const handleUser = async () => {
    if (user) {
      try {
        const userRef = doc(db, "users", user.id);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setUserData(userSnap.data() as any);
          console.log("Existing user data fetched");
        } else {
          // User doesn't exist, create new user
          const newUserData = {
            clerkUserId: user.id,
            email: user.emailAddresses[0]?.emailAddress ?? "",
          };
          await setDoc(userRef, newUserData);
          setActiveUser(newUserData);
          console.log("New user created in Firebase");
        }
      } catch (error) {
        console.error("Error managing user in Firebase:", error);
      }
    }
  };

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
          <TouchableOpacity onPress={() => {}}>
            <Image
              style={{ width: 40, height: 40, borderRadius: 50 }}
              src={user?.imageUrl}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.featured}>
          <Text style={{ fontFamily: "poppinsbold" }}>Featured Tasks</Text>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={featuredtasks}
            renderItem={({ item }) => <FeaturedTaskCard task={item} />}
            keyExtractor={(task) => task.id}
          />
        </View>
        <View style={styles.featured}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontFamily: "poppinsbold" }}>Categories</Text>
            <TouchableOpacity style={{}}>
              <Text style={{ fontSize: 10 }}>View All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={categories}
            renderItem={({ item }) => <CategoriesCard category={item} />}
          />
        </View>
        <View
          style={{
            borderRadius: 17,
            borderColor: Colors.light.lightGray,
            borderWidth: StyleSheet.hairlineWidth,
            marginTop: 20,
            padding: 15,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 14, fontFamily: "poppinsblack" }}>
              My tasks
            </Text>
            <TouchableOpacity
              style={{
                borderColor: Colors.light.lightGray,
                borderWidth: StyleSheet.hairlineWidth,
                paddingVertical: 5,
                paddingHorizontal: 12,
                borderRadius: 20,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
              }}
            >
              <Text style={{ fontSize: 10, fontFamily: "poppinsregular" }}>
                Due Soon
              </Text>
              <FontAwesome5
                name="chevron-down"
                size={12}
                color={Colors.light.lightGray}
              />
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 10 }}></View>
          <View style={{ marginTop: "auto" }}>
            <TouchableOpacity
              style={{
                borderRadius: 50,
                borderColor: Colors.light.lightGray,
                borderWidth: StyleSheet.hairlineWidth,
                marginTop: 20,
                padding: 10,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: "poppinsmedium",
                  fontSize: 12,
                }}
              >
                Go to My Tasks
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* <Text style={{ color: "#fff", marginTop: 12 }}>{user?.id}</Text> */}
        {/* <View style={{ backgroundColor: "#fff" }}></View> */}
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
        <Pressable
            style={{
              backgroundColor: Colors.light.secondary,
              marginTop: 70,
              borderRadius: 8,
              padding: 10,
            }}
            onPress={() => signOut({ redirectUrl: "/(auth)sign-up" })}
          >
            <Text style={{ textAlign: "center" }}>sign out</Text>
          </Pressable>
        <SignedOut>
          <Link href={"/(auth)/"}>
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
