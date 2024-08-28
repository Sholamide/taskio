import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { router, Stack } from "expo-router";
import { Entypo, Feather } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebase/firebase-config";
import { useUser } from "@clerk/clerk-expo";
import useUserStore from "@/store/user-store";

export default function AddTask() {
  const { user } = useUser();
  const { addTask, activeUser } = useUserStore();

  const [loading, setLoading] = React.useState(false);

  //task form values
  const [todo, setTodo] = React.useState({
    title: "",
    description: "",
  });

  const handleTaskCreation = async (title: string, description: string) => {
    setLoading(true);

    if (title === "") {
      Alert.alert("Error", "Title required");
      setLoading(false);
      return;
    }

    if (description === "") {
      Alert.alert("Error", "Description required");
      setLoading(false);
      return;
    }
    
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
      router.back();
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: "Add Task",
          headerBackTitleVisible: false,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Entypo
                name="chevron-with-circle-left"
                size={24}
                color={Colors.light.primary}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <View>
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
                  backgroundColor: "#191818",
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
                  style={{
                    padding: 8,
                    color: "#f5f5f5",
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
                  backgroundColor: "#191818",
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
                  editable
                  numberOfLines={4}
                  multiline
                  style={{
                    color: "#f5f5f5",
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
          onPress={() => handleTaskCreation(todo.title, todo.description)}
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 5,
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            marginVertical: 20,
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
            Add
          </Text>
          {loading ? <ActivityIndicator /> : null}
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
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
  backdrop: {
    padding: 20,
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
  },
});
