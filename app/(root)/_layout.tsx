import Colors from "@/constants/Colors";
import { Entypo } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { TouchableOpacity } from "react-native";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      {/* <Stack.Screen
        name="task-details/[Id]"
        options={{
          headerShown: true,
          headerTitle: "",
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
      /> */}
    </Stack>
  );
};

export default Layout;
