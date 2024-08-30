import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function TaskCard({ task }: { task: Task }) {
  return (
    <TouchableOpacity
      onPress={() => {
        router.push({
          pathname: "/(root)/task-details",
          params: task,
        });
      }}
      style={{
        width: "100%",
        height: "auto",
        marginVertical: 5,
        padding: 5,
        borderColor: "#686565",
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 8,
      }}
    >
      <Text>{task?.title}</Text>
      <Text>{task?.description}</Text>
    </TouchableOpacity>
  );
}
