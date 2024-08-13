import { StyleSheet, Text } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { Entypo } from "@expo/vector-icons";
import { TouchableOpacity } from "./Themed";

const FAB = ({
  title,
  onPress,
  icon,
}: {
  title: string;
  icon?: any;
  onPress?: () => void;
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Entypo name="plus" size={24} color="white" />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default FAB;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 20,
    position: "absolute",
    bottom: 25,
    right: 10,
    gap: 10,
    backgroundColor: Colors.light.secondary,
    paddingHorizontal: 15,
    paddingVertical: 6,
  },
  title: {
    fontSize: 13,
    fontFamily: "poppinsmedium",
    color: "#ffffff",
    fontWeight: "bold",
  },
});
