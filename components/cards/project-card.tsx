import { StyleSheet, TouchableOpacity as TOpacity, Image } from "react-native";
import { TouchableOpacity, View, Text } from "../Themed";
import Colors from "@/constants/Colors";
import { router } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import useStore from "@/store/user-store";
import { Entypo } from "@expo/vector-icons";

export default function ProjectCard({ task }: { task: featuredTasks }) {
  const { user } = useUser();
  const {
    activeUser,
    categories,
    setCategories,
    featuredtasks,
    setFeaturedTasks,
    setActiveUser,
  } = useStore();

  return (
    <TouchableOpacity style={styles.cardcontainer}>
      <View
        style={[
          {
            // backgroundColor: getCategoryTheme(task.categoryName)
            // backgroundColor: "#1a1818",
            borderColor: "#777474",
            borderWidth: StyleSheet.hairlineWidth,
          },
          styles.card,
        ]}
      >
        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <View
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: Colors.light.secondary,
                paddingHorizontal: 10,
                paddingVertical: 2,
                borderRadius: 50,
              }}
            >
              <Text
                style={{
                  fontSize: 10,
                  color: Colors.light.input,
                  fontFamily: "poppinsmedium",
                }}
              >
                Personal
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 50,
                color: "#837979",
                fontFamily: "poppinsregular",
              }}
            >
              Taskio
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: "#f5f5f5",
                fontFamily: "poppinsregular",
              }}
            >
              Mobile app development with react native
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "auto",
            }}
          >
            <TouchableOpacity>
              <Image style={styles.image} src={user?.imageUrl} />
            </TouchableOpacity>
            <TOpacity
              style={{
                backgroundColor: "#312f2f",
                paddingHorizontal: 8,
                paddingVertical: 3,
                borderRadius: 50,
              }}
            >
              <View
                style={{
                  backgroundColor: "#312f2f",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <Entypo name="flag" size={10} color={Colors.light.primary} />
                <Text
                  style={{
                    color: "#ede5e5",
                    fontSize: 10,
                    fontFamily: "poppinsbold",
                  }}
                >{`12 Jun 2024`}</Text>
              </View>
            </TOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardcontainer: {
    marginTop: 5,
    marginRight: 10,
  },
  card: {
    width: 200,
    height: 200,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
  topSection: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  topSectionLeft: {
    display: "flex",
    width: 150,
  },
  taskname: {
    fontFamily: "latoblack",
    fontSize: 15,
  },
  image: {
    width: 20,
    height: 20,
    borderRadius: 50,
  },
  bottomSection: {
    marginTop: "auto",
  },
  description: {
    fontFamily: "latoregular",
    fontSize: 12,
  },
});
