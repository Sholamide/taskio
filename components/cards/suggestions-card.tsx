import { getCategoryTheme } from "@/actions";
import { View, Text, StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "../Themed";

export default function SuggestionCard({ task }: { task: featuredTasks }) {
  return (
    <TouchableOpacity style={styles.cardcontainer}>
      <View
        style={[
          styles.card,
        ]}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ display: "flex", width: 150 }}>
            <Text style={{ fontFamily: "latoblack", fontSize: 15 }}>
              {task.name}
            </Text>
          </View>
          <Image
            style={{ width: 30, height: 30, borderRadius: 50 }}
            src={task.userImageURL}
          />
        </View>
        <View style={{ marginTop: "auto" }}>
          <Text style={{ fontFamily: "latoregular", fontSize: 12 }}>
            {task.description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardcontainer: {
    marginTop: 5,
    marginRight: 5,
  },
  card: {
    width: 250,
    height: 100,
    backgroundColor:"#0f0d0d",
    borderColor:"#f5f5f5",
    padding: 10,
    borderRadius: 10,
    borderWidth: 0.5,
  },
});
