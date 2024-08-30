import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect } from "react";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { Entypo, Feather } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useUser } from "@clerk/clerk-expo";
import { db } from "@/config/firebase/firebase-config";
import useUserStore from "@/store/user-store";
// import { Task } from "@/interface";

interface Todo {
  title: string;
  description: string;
}
export default function TaskDetails() {
  const { user } = useUser();
  const { deleteTask, setUserTasks } = useUserStore();
  const task = useLocalSearchParams();
  const navigation = useNavigation();
  const [isEditable, setIsEditable] = React.useState(false);
  const [loading, setLoading] = React.useState({
    updating: false,
    deleting: false,
  });

  useEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerTitle: "",
      headerLeft: () => (
        <TouchableOpacity onPress={() => router.back()}>
          <Entypo
            name="chevron-with-circle-left"
            size={24}
            color={Colors.light.primary}
          />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={() => {}}>
          <Entypo
            name="dots-three-vertical"
            size={24}
            color={Colors.light.primary}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  //task form values
  const [todo, setTodo] = React.useState<Todo>({
    title: typeof task.title === "string" ? task.title : "",
    description: typeof task.description === "string" ? task.description : "",
  });

  // Function to set loading state for updating tasks
  const setUpdatingLoading = (isLoading: boolean) => {
    setLoading((prevLoading) => ({
      ...prevLoading,
      updating: isLoading,
    }));
  };

  // Function to set loading state for deleting tasks
  const setDeletingLoading = (isLoading: boolean) => {
    setLoading((prevLoading) => ({
      ...prevLoading,
      deleting: isLoading,
    }));
  };

  const handleTaskUpdate = async (id: string | string[]) => {
    setUpdatingLoading(true);

    try {
      if (todo.title === "") {
        Alert.alert("Error", "Title required");
        setUpdatingLoading(false);
        return;
      }

      if (todo.description === "") {
        Alert.alert("Error", "Description required");
        setUpdatingLoading(false);
        return;
      }

      const updatedTaskData = {
        // Generate a unique ID
        id: Date.now().toString(),
        title: todo.title,
        description: todo.description,
        createdAt: new Date(),
      };

      const userDocRef = doc(db, "users", user!.id);

      // First, get the current user document
      const userDoc = await getDoc(userDocRef);
      const userData = userDoc.data();

      if (!userData) {
        Alert.alert("Error", "User data is invalid");
      }

      if (!userData?.tasks) {
        Alert.alert("Error", "No tasks found");
      }

      // Map through the tasks, updating the one with the matching ID
      const updatedTasks = userData?.tasks.map((task: Task) =>
        task.id === id ? { ...task, ...updatedTaskData } : task,
      );

      // Update the document with the new tasks array
      await updateDoc(userDocRef, {
        tasks: updatedTasks,
      });

      setUserTasks(updatedTasks);
    } catch (error) {
      console.log(error);
    } finally {
    }
    setUpdatingLoading(false);
    if (isEditable) {
      setIsEditable(true);
    } else {
      setIsEditable(false);
    }
    Alert.alert("Success", "Task successfully deleted", [
      { text: "OK", onPress: () => router.back() },
    ]);
  };

  const handleTaskDeletion = async (id: string | string[]) => {
    setDeletingLoading(true);
    try {
      const userDocRef = doc(db, "users", user!.id);
      const userDoc = await getDoc(userDocRef);
      const userData = userDoc.data();

      if (!userData) {
        Alert.alert("Error", "User data is invalid");
      }

      if (!userData?.tasks) {
        Alert.alert("Error", "No tasks found");
      }

      // Filter out the task with the matching ID
      const updatedTasks = userData?.tasks.filter(
        (task: Task) => task.id !== id,
      );

      // Update the document with the new tasks array
      await updateDoc(userDocRef, {
        tasks: updatedTasks,
      });

      deleteTask(String(id));

      console.log("Task updated successfully");
    } catch (error) {
      console.error("Error deleting task: ", error);
    } finally {
      setDeletingLoading(false);
      Alert.alert("Success", "Task successfully deleted", [
        { text: "OK", onPress: () => router.back() },
      ]);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 20,
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={{
              marginVertical: 5,
              width: "100%",
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: "700",
                letterSpacing: 0.5,
                marginBottom: 6,
                color: "#fff",
              }}
            >
              Title
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                position: "relative",
                backgroundColor: isEditable ? "#ffffff" : "#191818",
                borderRadius: 8,
                padding: 5,
                borderColor: "#827c7c",
                borderWidth: StyleSheet.hairlineWidth,
              }}
            >
              <Feather
                style={{ marginLeft: 4 }}
                name="list"
                size={15}
                color={Colors.light.secondary}
              />
              <TextInput
                editable={isEditable}
                style={{
                  padding: 8,
                  color: isEditable ? "#000000" : "#f5f5f5",
                  fontWeight: "300",
                }}
                value={todo.title}
                autoCapitalize="none"
                placeholder="Task title"
                onChangeText={(value) => setTodo({ ...todo, title: value })}
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
              marginVertical: 5,
              width: "100%",
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: "700",
                letterSpacing: 0.5,
                marginBottom: 6,
                color: "#fff",
              }}
            >
              Description
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                position: "relative",
                backgroundColor: isEditable ? "#ffffff" : "#191818",
                borderRadius: 8,
                padding: 5,
                borderColor: "#827c7c",
                borderWidth: StyleSheet.hairlineWidth,
              }}
            >
              <Feather
                style={{ marginVertical: 6 }}
                name="type"
                size={15}
                color={Colors.light.secondary}
              />
              <TextInput
                editable={isEditable}
                numberOfLines={4}
                multiline
                style={{
                  color: isEditable ? "#000000" : "#f5f5f5",
                  fontWeight: "300",
                  height: 150,
                  width: "100%",
                  marginLeft: 4,
                }}
                value={todo.description}
                autoCapitalize="none"
                placeholder="Task description"
                onChangeText={(value) =>
                  setTodo({ ...todo, description: value })
                }
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <TouchableOpacity
        onPress={() =>
          isEditable ? handleTaskUpdate(task.id) : setIsEditable(true)
        }
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 5,
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          marginVertical: 5,
          backgroundColor: Colors.light.primary,
          padding: 10,
          borderRadius: 8,
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 16,
          }}
        >
          {isEditable ? "Update Task" : "Edit Task"}
        </Text>
        {loading.updating ? <ActivityIndicator /> : null}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleTaskDeletion(task.id)}
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 5,
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          backgroundColor: Colors.light.crimsonRed,
          padding: 10,
          borderRadius: 8,
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 16,
          }}
        >
          Delete Task
        </Text>
        {loading.deleting ? <ActivityIndicator /> : null}
      </TouchableOpacity>
    </View>
  );
}
