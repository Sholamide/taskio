import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { useAuth, useUser } from "@clerk/clerk-expo";
import Colors from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";

export default function ProfileScreen() {
  const router = useRouter();
  const { user } = useUser();
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();

    router.replace("/(auth)/sign-in");
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <Text style={styles.headerTopText}>My Account,</Text>
          <Text style={styles.headerBottomText}>{user?.username}</Text>
        </View>
        <TouchableOpacity onPress={() => router.push("/(root)/(tabs)/account")}>
          <Image style={styles.image} src={user?.imageUrl} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View
          style={{
            marginTop: 40,
          }}
        >
          <TouchableOpacity>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                borderTopLeftRadius: 6,
                borderTopRightRadius: 6,
                paddingVertical: 12,
                paddingHorizontal: 10,
                backgroundColor: "#383737",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  backgroundColor: "#383737",
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: "#7e7a7a",
                    padding: 4,
                    borderRadius: 50,
                  }}
                >
                  <FontAwesome name="chain" color="#fff" />
                </TouchableOpacity>

                <Text style={{ fontSize: 12, fontFamily: "poppinsregular" }}>
                  My Account Settings
                </Text>
              </View>

              <FontAwesome name="chevron-right" color="#f5f5f5" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: 12,
                paddingHorizontal: 10,
                borderTopColor: "#727070",
                borderWidth: StyleSheet.hairlineWidth,
                backgroundColor: "#383737",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  backgroundColor: "#383737",
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: "#7e7a7a",
                    padding: 5,
                    borderRadius: 9,
                  }}
                >
                  <FontAwesome name="lock" color="#fff" />
                </TouchableOpacity>
                <Text style={{ fontSize: 12, fontFamily: "poppinsregular" }}>
                  Security
                </Text>
              </View>

              <FontAwesome name="chevron-right" color="#f5f5f5" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: 12,
                paddingHorizontal: 10,
                borderTopColor: "#aeabab",
                borderWidth: StyleSheet.hairlineWidth,
                backgroundColor: "#383737",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  backgroundColor: "#383737",
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: "#7e7a7a",
                    padding: 4,
                    borderRadius: 50,
                  }}
                >
                  <FontAwesome name="phone" color="#fff" />
                </TouchableOpacity>
                <Text style={{ fontSize: 12, fontFamily: "poppinsregular" }}>
                  Contact Us
                </Text>
              </View>

              <FontAwesome name="chevron-right" color="#f5f5f5" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: 12,
                paddingHorizontal: 10,
                borderTopColor: "#aeabab",
                borderWidth: StyleSheet.hairlineWidth,
                backgroundColor: "#383737",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  backgroundColor: "#383737",
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: "#7e7a7a",
                    padding: 4,
                    borderRadius: 50,
                  }}
                >
                  <FontAwesome name="bars" color="#f5f5f5" />
                </TouchableOpacity>
                <Text style={{ fontSize: 12, fontFamily: "poppinsregular" }}>
                  Check for Updates
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSignOut}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: 12,
                paddingHorizontal: 10,
                borderTopColor: "#aeabab",
                borderWidth: StyleSheet.hairlineWidth,
                backgroundColor: "#383737",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  backgroundColor: "#383737",
                }}
              >
                <FontAwesome name="power-off" color={Colors.light.crimsonRed} />
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: "poppinsregular",
                    color: Colors.light.crimsonRed,
                  }}
                >
                  Log Out
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  wrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 20,
    alignItems: "center",
  },
  header: {
    gap: 3,
  },
  headerTopText: {
    fontSize: 18,
    fontFamily: "poppinsbold",
  },
  headerBottomText: {
    fontSize: 15,
    fontFamily: "poppinsmedium",
    textTransform: "capitalize",
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 50,
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
