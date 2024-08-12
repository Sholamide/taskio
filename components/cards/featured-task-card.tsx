import { getCategoryTheme } from "@/actions";
import { View, Text, StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "../Themed";

export default function FeaturedTaskCard({ task }: { task: featuredTasks }) {
  return (
    <TouchableOpacity style={styles.cardcontainer}>
      <View
        style={[
          { backgroundColor: getCategoryTheme(task.categoryId) },
          styles.card,
        ]}
      >
        <View style={styles.topSection}>
          <View style={styles.topSectionLeft}>
            <Text style={styles.taskname}>{task.name}</Text>
          </View>
          <Image style={styles.image} src={task.userImageURL} />
        </View>
        <View style={styles.bottomSection}>
          <Text style={styles.description}>{task.description}</Text>
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
    width: 200,
    height: 125,
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
    width: 30,
    height: 30,
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
