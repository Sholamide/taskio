import { useState } from "react";
import { Image, StyleSheet } from "react-native";
import { Text, TouchableOpacity, View } from "../Themed";
import { useUser } from "@clerk/clerk-expo";
import { Entypo } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import useUserStore from "@/store/user-store";
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

      {/* <View
        style={{
          display: "flex",
          height: "100%",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            height: "100%",
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              gap: 6,
            }}
          >
            <Text style={{ fontFamily: "poppinsbold", fontSize: 12 }}>
              Finish Home Screens
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: 6,
              }}
            >
              <Entypo name="calendar" size={14} color={Colors.light.primary} />

              <Text style={{ fontFamily: "poppinsregular", fontSize: 10 }}>
                21/09/2024{" "}
                <Text style={{ fontFamily: "poppinsmedium" }}>02:30PM</Text>
              </Text>
            </View>
            <Text style={{ fontFamily: "poppinsregular", fontSize:10, color:"#5f5c5c" }}>Complete design and implementation of all home screen components.
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: Colors.light.secondary,
                paddingHorizontal: 3,
                paddingVertical: 2,
                borderRadius: 2,
              }}
            >
              <Text
                style={{
                  fontSize: 7,
                  color: Colors.light.background,
                  fontFamily: "poppinsregular",
                }}
              >
                Personal
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            marginTop: "auto",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 4,
            }}
          >
            <Image
              style={{
                width: 20,
                height: 20,
                borderRadius: 50,
              }}
              src={user?.imageUrl}
            />
            <Text style={{ fontSize: 10, fontFamily: "poppinsmedium" }}>
              {user?.firstName || user?.emailAddresses[0].emailAddress}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 10, fontFamily: "poppinsregular" }}>
                View task details
              </Text>
              <Entypo
                name="chevron-right"
                size={12}
                color={Colors.light.secondary}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View> */}
    </TouchableOpacity>
  );
}
