import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import { Stack } from "expo-router";
import { Text, TouchableOpacity, View, TextInput } from "@/components/Themed";
import { View as NativeView } from "react-native";
import { Entypo, Feather } from "@expo/vector-icons";
import FAB from "@/components/fab";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import Colors from "@/constants/Colors";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/config/firebase/firebase-config";
import { useUser } from "@clerk/clerk-expo";
import useUserStore from "@/store/user-store";

export default function TaskScreen() {
  const sheetRef = useRef<BottomSheet>(null);
  const { user } = useUser();
  const { addTask } = useUserStore();
  const [IsCreateTaskMode, setIsCreateTaskMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const snapPoints = useMemo(() => ["60%", "90%"], []);

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

      console.log("Task added to user's tasks array");
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
          headerShown: true,
          headerTitle: "",
          headerShadowVisible: true,
          headerLeft: () => (
            <Text
              style={{
                marginLeft: 20,
                fontSize: 18,
                fontFamily: "poppinsbold",
              }}
            >
              My Tasks
            </Text>
          ),
          headerRight: () => (
            <TouchableOpacity style={{ marginRight: 20 }}>
              <Feather name="more-horizontal" size={35} color="white" />
            </TouchableOpacity>
          ),
        }}
      />
      {IsCreateTaskMode && (
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
      )}

      {!IsCreateTaskMode && (
        <FAB onPress={() => setIsCreateTaskMode(true)} title="New Task" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});
