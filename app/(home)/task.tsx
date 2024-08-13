import { StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, TouchableOpacity, View } from "@/components/Themed";
import { Stack } from "expo-router";
import { Feather } from "@expo/vector-icons";
import FAB from "@/components/fab";

export default function TaskScreen() {
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

      {/* 
    <View
      style={styles.separator}
      lightColor="#eee"
      darkColor="rgba(255,255,255,0.1)"
    />
    <EditScreenInfo path="app/(tabs)/index.tsx" /> */}
      <FAB title="New Task" />
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
