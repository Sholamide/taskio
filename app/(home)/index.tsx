import {
  FlatList,
  SafeAreaView,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";

import { Text, TextInput, TouchableOpacity, View } from "@/components/Themed";
import { Stack, useRouter } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import React, { useEffect } from "react";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "@/config/firebase/firebase-config";
import useStore from "@/store/store";
import Colors from "@/constants/Colors";
import { Entypo } from "@expo/vector-icons";
import ProjectCard from "@/components/cards/project-card";
import TaskCard from "@/components/cards/task-card";

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useUser();
  const {
    categories,
    setCategories,
    featuredtasks,
    setFeaturedTasks,
    setActiveUser,
  } = useStore();

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
          setActiveUser(userSnap.data() as any);
          // console.log("Existing user data fetched");
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
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <View style={styles.header}>
        <View style={styles.headerleft}>
          <Text style={styles.headerTitle}>
            Hello{" "}
            {user?.firstName ||
              user?.emailAddresses[0].emailAddress.split("@")[0]}
            ,
          </Text>
          <Text style={styles.headerPunchline}>
            Task smarter, not harder ✨
          </Text>
        </View>
        <TouchableOpacity onPress={() => router.push("/(home)/account")}>
          <Image style={styles.image} src={user?.imageUrl} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.wrapper}>
        <View
          style={{
            borderColor: "#686565",
            borderWidth: StyleSheet.hairlineWidth,
            borderRadius: 5,
            padding: 15,
          }}
        >
          <TextInput
            style={{ fontSize: 10, fontFamily: "poppinsregular" }}
            placeholder="Search tasks or projects..."
          />
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 8,
            marginTop: 10,
            padding: 5,
          }}
        >
          <TouchableOpacity
            style={{
              borderColor: "#686565",
              borderWidth: StyleSheet.hairlineWidth,
              borderRadius: 8,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              padding: 10,
              height: 100,
              width: "48%",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 6,
              }}
            >
              <Entypo name="list" size={20} color={Colors.light.primary} />
              <Text style={{ fontFamily: "poppinsregular", fontSize: 14 }}>
                All tasks
              </Text>
            </View>
            <Text style={{ fontSize: 12, fontFamily: "poppinsregular" }}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "poppinsbold",
                  color: Colors.light.primary,
                }}
              >
                12
              </Text>
              &nbsp;tasks
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderColor: "#686565",
              borderWidth: StyleSheet.hairlineWidth,
              borderRadius: 8,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              padding: 10,
              height: 100,
              width: "48%",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 6,
              }}
            >
              <Entypo name="flattr" size={20} color={Colors.light.primary} />
              <Text style={{ fontFamily: "poppinsregular", fontSize: 14 }}>
                Projects
              </Text>
            </View>
            <Text style={{ fontSize: 12, fontFamily: "poppinsregular" }}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "poppinsbold",
                  color: Colors.light.primary,
                }}
              >
                4
              </Text>
              &nbsp;projects
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.sectionHeader}>
          <View style={styles.categoryHeader}>
            <Text style={styles.title}>Your Projects</Text>
            <TouchableOpacity>
              <Text style={styles.viewall}>see all</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={featuredtasks}
            renderItem={({ item }) => <ProjectCard task={item} />}
            keyExtractor={(task) => task.id}
          />
        </View>
        <View style={styles.sectionHeader}>
          <View style={styles.categoryHeader}>
            <Text style={styles.title}>
              Recent tasks{" "}
              <Text style={{ color: Colors.light.primary }}>(10)</Text>
            </Text>
            <TouchableOpacity>
              <Text style={styles.viewall}>see all</Text>
            </TouchableOpacity>
          </View>
          {[1, 2, 3].map((index: number) => (
            <TaskCard key={index} />
          ))}
          {/* <TaskCard /> */}
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <TouchableOpacity
              onPress={() => router.push("/(home)/task")}
              style={{
                backgroundColor: Colors.light.secondary,
                paddingHorizontal: 50,
                paddingVertical: 5,
                borderRadius: 8,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: "poppinsregular",
                  fontSize: 10,
                }}
              >
                View More
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 20,
  },
  header: {
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
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
  image: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  sectionHeader: {
    padding: 10,
  },
  categoryHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontFamily: "poppinsbold",
  },
  viewall: {
    fontSize: 10,
  },
  tasksContainer: {
    borderRadius: 17,
    borderColor: Colors.light.lightGray,
    borderWidth: StyleSheet.hairlineWidth,
    marginTop: 20,
    padding: 15,
  },
  tasksHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  mytasks: {
    fontSize: 14,
    fontFamily: "poppinsblack",
  },
  duesooncontainer: {
    borderColor: Colors.light.lightGray,
    borderWidth: StyleSheet.hairlineWidth,
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  duesoon: {
    fontSize: 10,
    fontFamily: "poppinsregular",
  },
  gotomytaskscontainer: {
    borderRadius: 50,
    borderColor: Colors.light.lightGray,
    borderWidth: StyleSheet.hairlineWidth,
    marginTop: 20,
    padding: 10,
  },
  gotomytask: {
    textAlign: "center",
    fontFamily: "poppinsmedium",
    fontSize: 12,
  },
});
