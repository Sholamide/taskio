import { useCallback, useMemo, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
} from "react-native";
import { Stack } from "expo-router";
import { Text, TouchableOpacity, View } from "@/components/Themed";
import { View as NativeView } from "react-native";
import { Entypo, Feather } from "@expo/vector-icons";
import FAB from "@/components/fab";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import Colors from "@/constants/Colors";

export default function TaskScreen() {
  const sheetRef = useRef<BottomSheet>(null);
  const [IsCreateTaskMode, setIsCreateTaskMode] = useState(false);
  const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);

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
              My tasks
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
              <NativeView style={{}}>
                <KeyboardAvoidingView
                  behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                  <TextInput
                    placeholderTextColor="#000"
                    placeholder="Title"
                    style={{
                      borderWidth: StyleSheet.hairlineWidth,
                      borderColor: "#000",
                      borderRadius: 10,
                      fontFamily: "poppinsbold",
                      fontSize: 18,
                      padding: 10,
                    }}
                    onPress={() => handleSnapPress(1)}
                  ></TextInput>
                </KeyboardAvoidingView>
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
});
