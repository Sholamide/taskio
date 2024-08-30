import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { Entypo } from "@expo/vector-icons";

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
      <Entypo name="plus" size={30} color="white" />
      {/* <Text style={styles.title}>{title}</Text> */}
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
    borderRadius: 50,
    position: "absolute",
    bottom: 25,
    right: 15,
    gap: 1,
    backgroundColor: Colors.light.primary,
    padding: 20,
  },
  title: {
    fontSize: 13,
    fontFamily: "poppinsmedium",
    color: "#ffffff",
    fontWeight: "bold",
  },
});
