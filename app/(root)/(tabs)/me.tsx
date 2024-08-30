import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { router, Stack } from "expo-router";
import FAB from "@/components/fab";
import Colors from "@/constants/Colors";
import useUserStore from "@/store/user-store";
import TaskCard from "@/components/cards/task-card";

export default function MeScreen() {
  const { activeUser } = useUserStore();
  const [visibility, setVisibility] = useState({
    isTaskVisible: true,
    isProjectVisible: false,
  });

  // Function to show tasks (no action if already visible)
  const showTasks = () => {
    setVisibility((prevState) => ({
      ...prevState,
      isTaskVisible: true,
      isProjectVisible: false, // Ensure projects are hidden when tasks are shown
    }));
  };

  // Function to show projects (no action if already visible)
  const showProjects = () => {
    setVisibility((prevState) => ({
      ...prevState,
      isTaskVisible: false, // Ensure tasks are hidden when projects are shown
      isProjectVisible: true,
    }));
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
          // headerTitle: "",
          // headerShadowVisible: true
        }}
      />
      <View
        style={{
          marginTop: 30,
          width: "100%",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            borderRadius: 10,
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: "#3c3c3c",
          }}
        >
          <TouchableOpacity
            onPress={showTasks}
            style={{
              padding: 10,
              backgroundColor: visibility.isTaskVisible
                ? Colors.light.primary
                : "#2b2b2b",
              borderTopLeftRadius: 20,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "50%",
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontFamily: "poppinsregular",
              }}
            >
              My Tasks
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={showProjects}
            style={{
              padding: 10,
              backgroundColor: visibility.isProjectVisible
                ? Colors.light.primary
                : "#2b2b2b",
              borderTopRightRadius: 20,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "50%",
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontFamily: "poppinsregular",
              }}
            >
              My Projects
            </Text>
          </TouchableOpacity>
        </View>
        {visibility.isTaskVisible && (
          <View
            style={{
              paddingTop: 10,
            }}
          >
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={activeUser.tasks}
              renderItem={({ item }) => <TaskCard task={item} />}
              keyExtractor={(task) => task.id}
            />
          </View>
        )}
        {visibility.isProjectVisible && (
          <View
            style={{
              padding: 20,
            }}
          >
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={activeUser.tasks}
              renderItem={({ item }) => <TaskCard task={item} />}
              keyExtractor={(task) => task.id}
            />
          </View>
        )}
      </View>
      <FAB onPress={() => router.push("/add-task")} title="New Task" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    height: 10,
  },
  input: {
    borderRadius: 50,
    padding: 10,
    flex: 1,
    textAlign: "left",
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
  categoryoptions: {
    position: "absolute",
    top: 53,
    backgroundColor: "#fff",
    width: "100%",
    padding: 10,
    borderRadius: 6,
    maxHeight: 250,
  },
  optionsItem: {
    height: 40,
    justifyContent: "center",
  },
  categoryselect: {
    height: 50,
    justifyContent: "space-between",
    backgroundColor: "#fff",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 15,
  },
  categoryselecttext: {
    fontSize: 15,
    opacity: 0.8,
  },
});
