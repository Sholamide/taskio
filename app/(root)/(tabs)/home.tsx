import {
  SafeAreaView,
  Image,
  ScrollView,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";

import { Text, TouchableOpacity, View } from "@/components/Themed";
import { Stack, useRouter } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import React, { useEffect, useState } from "react";
import Colors from "@/constants/Colors";
import { Entypo } from "@expo/vector-icons";
import TaskCard from "@/components/cards/task-card";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebase/firebase-config";
import useUserStore from "@/store/user-store";

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useUser();
  const { activeUser, setActiveUser } = useUserStore();
  const [loading, setLoading] = useState(false);

  const InitUser = async (userid: string) => {
    setLoading(true);
    // user
    try {
      const activeUserRef = doc(db, "users", userid);
      const activeUserSnap = await getDoc(activeUserRef);

      if (activeUserSnap.exists()) {
        setActiveUser(activeUserSnap.data());
      } else {
        // docSnap.data() will be undefined in this case
        Alert.alert("Error", "No user data found!");
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
    // user projects
  };

  useEffect(() => {
    InitUser(user?.id!);
  }, [user]);

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      {loading ? (
        <ActivityIndicator style={{ margin: 20 }} />
      ) : (
        <View style={styles.header}>
          <View style={styles.headerleft}>
            <Text style={styles.headerTitle}>
              Hello {user?.username || user?.emailAddresses[0].emailAddress},
            </Text>
            <Text style={styles.headerPunchline}>
              Task smarter, not harder ✨
            </Text>
          </View>
          <TouchableOpacity onPress={() => router.push("/(root)/(tabs)/account")}>
            <Image
              style={styles.image}
              src={user?.imageUrl || require("../../../assets/images/icon.png")}
            />
          </TouchableOpacity>
        </View>
      )}

      <ScrollView style={styles.wrapper}>
        {/* <View
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
        </View> */}
        {loading ? (
          <ActivityIndicator style={{ margin: 20 }} />
        ) : (
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
                  {activeUser.tasks?.length}
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
                  {activeUser.projects?.length}
                </Text>
                &nbsp;projects
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* <View style={styles.sectionHeader}>
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
        </View> */}
        {loading ? (
          <ActivityIndicator style={{ margin: 20 }} />
        ) : (
          <View style={styles.sectionHeader}>
            <View style={styles.categoryHeader}>
              <Text style={styles.title}>
                Recent tasks{" "}
                <Text style={{ color: Colors.light.primary }}>
                  {activeUser.tasks?.length}
                </Text>
              </Text>
              <TouchableOpacity>
                <Text style={styles.viewall}>see all</Text>
              </TouchableOpacity>
            </View>
            {activeUser?.tasks?.length === 0 ? (
              <View
                style={{
                  padding: 20,
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 10,
                  marginTop: 40,
                }}
              >
                <TouchableOpacity
                  onPress={() => router.push("/(root)/(tabs)/me")}
                  style={{
                    height: 300,
                    width: 300,
                    backgroundColor: Colors.light.primary,
                    borderRadius: 999,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Entypo name="plus" size={150} color="#000000" />
                  <Text
                    style={{
                      fontFamily: "poppinsregular",
                      color: "#000000",
                      fontSize: 12,
                    }}
                  >
                    Create new task
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                {activeUser.tasks &&
                  activeUser.tasks.map((task: Task, index: number) => (
                    <TaskCard task={task} key={index} />
                  ))}
                <View
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 10,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => router.push("/(root)/(tabs)/me")}
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
            )}
          </View>
        )}
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
    textTransform: "capitalize",
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
