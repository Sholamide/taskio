import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
} from "react-native";
import { router, Stack } from "expo-router";
import { Text, TouchableOpacity, View, TextInput } from "@/components/Themed";
import { View as NativeView } from "react-native";
import { AntDesign, Entypo, Feather } from "@expo/vector-icons";
import FAB from "@/components/fab";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import Colors from "@/constants/Colors";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/config/firebase/firebase-config";
import { useUser } from "@clerk/clerk-expo";
import useUserStore from "@/store/user-store";
import ProjectCard from "@/components/cards/project-card";
import TaskCard from "@/components/cards/task-card";

export default function MeScreen() {
  const sheetRef = useRef<BottomSheet>(null);
  const { user } = useUser();
  const { addTask, activeUser } = useUserStore();
  const [IsCreateTaskMode, setIsCreateTaskMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const snapPoints = useMemo(() => ["60%", "90%"], []);
  const [expanded, setExpanded] = useState(false);

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

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const handleSnapPress = useCallback((index: number) => {
    sheetRef.current?.snapToIndex(index);
  }, []);

  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
    setIsCreateTaskMode(false);
  }, []);

  const [todo, setTodo] = React.useState({
    title: "",
    description: "",
  });

  const handleTaskCreation = async (title: string, description: string) => {
    setLoading(true);
    const newTask = {
      // Generate a unique ID
      id: Date.now().toString(),
      title: title,
      description: description,
      createdAt: new Date(),
    };

    try {
      const userDocRef = doc(db, "users", user!.id);
      await updateDoc(userDocRef, {
        tasks: arrayUnion(newTask),
      });

      addTask(newTask);

      Alert.alert("Success", "Task successfully created");
    } catch (error) {
      console.error("Error adding task: ", error);
      Alert.alert("Error", "Failed to create task");
    } finally {
      setLoading(false);
    }
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
              data={activeUser.projects}
              renderItem={({ item }) => <ProjectCard task={item} />}
              keyExtractor={(task) => task.id}
            />
          </View>
        )}
      </View>
      {/* {IsCreateTaskMode && (
        <BottomSheet
          snapPoints={snapPoints}
          ref={sheetRef}
          onChange={handleSheetChanges}
        >
          <BottomSheetView style={{ flex: 1 }}>
            <NativeView
              style={{
                display: "flex",
                flex: 1,
                paddingHorizontal: 10,
                flexDirection: "column",
              }}
            >
              <TouchableOpacity
                onPress={handleClosePress}
                style={{
                  padding: 10,
                  backgroundColor: "#fff",
                  borderWidth: StyleSheet.hairlineWidth,
                  borderColor: "#b2afaf",
                  borderRadius: 50,
                  alignSelf: "flex-start",
                }}
              >
                <Entypo
                  name="cross"
                  size={20}
                  color={Colors.light.crimsonRed}
                />
              </TouchableOpacity>
              <NativeView style={{ marginTop: 20 }}>
                <Text
                  lightColor={Colors.light.primary}
                  darkColor={Colors.dark.primary}
                  style={{ fontFamily: "poppinsblack", fontSize: 24 }}
                >
                  New Task
                </Text>
              </NativeView>
              <NativeView style={{ padding: 10 }}>
                <KeyboardAvoidingView
                  behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <NativeView
                      style={{
                        marginVertical: 10,
                        width: "100%",
                      }}
                    >
                      <NativeView
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-start",
                          alignItems: "center",
                          position: "relative",
                          backgroundColor: "#848080",
                          borderRadius: 10,
                          padding: 5,
                          borderColor: "#f5f5f5",
                          borderWidth: StyleSheet.hairlineWidth,
                        }}
                      >
                        <Feather
                          style={{ marginLeft: 4 }}
                          name="feather"
                          size={24}
                          color={Colors.light.secondary}
                        />
                        <TextInput
                          style={styles.input}
                          value={todo.title}
                          autoCapitalize="none"
                          lightColor={Colors.light.text}
                          darkColor={Colors.dark.text}
                          placeholder="Task Title"
                          onChangeText={(value) =>
                            setTodo({ ...todo, title: value })
                          }
                        />
                      </NativeView>
                    </NativeView>
                  </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
                <KeyboardAvoidingView
                  behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <NativeView
                      style={{
                        marginVertical: 10,
                        width: "100%",
                      }}
                    >
                      <NativeView
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-start",
                          alignItems: "center",
                          position: "relative",
                          backgroundColor: "#848080",
                          borderRadius: 10,
                          padding: 5,
                          borderColor: "#f5f5f5",
                          borderWidth: StyleSheet.hairlineWidth,
                        }}
                      >
                        <Feather
                          style={{ marginLeft: 4 }}
                          name="hash"
                          size={24}
                          color={Colors.light.secondary}
                        />
                        <TextInput
                          style={styles.input}
                          value={todo.description}
                          autoCapitalize="none"
                          lightColor={Colors.light.text}
                          darkColor={Colors.dark.text}
                          placeholder="Task Description"
                          onChangeText={(value) =>
                            setTodo({ ...todo, description: value })
                          }
                        />
                      </NativeView>
                    </NativeView>
                  </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
                <TouchableOpacity
                  onPress={toggleExpanded}
                  style={styles.categoryselect}
                  activeOpacity={0.8}
                >
                  <Text style={{ fontSize: 15, opacity: 0.8 }}>
                    Select Category
                  </Text>
                  <AntDesign name={expanded ? "caretup" : "caretdown"} />
                </TouchableOpacity>
                {expanded ? (
                  <Modal visible={expanded} transparent>
                    <NativeView style={styles.categoryoptions}>
                      <FlatList
                        keyExtractor={(item) => item.value}
                        data={[
                          { value: "plumbing", label: "Plumbing" },
                          { value: "painting", label: "Painting" },
                        ]}
                        renderItem={({ item }) => (
                          <TouchableOpacity
                            style={styles.optionsItem}
                            activeOpacity={0.8}
                          >
                            <Text>{item.value}</Text>
                          </TouchableOpacity>
                        )}
                        ItemSeparatorComponent={() => (
                          <NativeView style={styles.separator} />
                        )}
                      />
                    </NativeView>
                  </Modal>
                ) : null}
                <TouchableOpacity
                  disabled={loading}
                  onPress={() =>
                    handleTaskCreation(todo.title, todo.description)
                  }
                  style={[
                    {
                      backgroundColor: loading
                        ? "#963c34"
                        : Colors.light.secondary,
                    },
                    styles.signinwrapper,
                  ]}
                >
                  <Feather
                    name="feather"
                    size={20}
                    color={Colors.light.primary}
                  />
                  <Text style={{}}> Create</Text>
                  {loading && <ActivityIndicator />}
                </TouchableOpacity>
              </NativeView>
            </NativeView>
          </BottomSheetView>
        </BottomSheet>
      )} */}

      {!IsCreateTaskMode && (
        <FAB onPress={() => router.push("/add-task")} title="New Task" />
      )}
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
