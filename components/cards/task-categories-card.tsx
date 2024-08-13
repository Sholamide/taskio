import { getCategoryTheme } from "@/actions";
import { View, Text, StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "../Themed";

export default function CategoriesCard({
  category,
}: {
  category: taskCategory;
}) {
  return (
    <TouchableOpacity style={styles.cardcontainer}>
      <View style={styles.cardwrapper}>
        <Image style={styles.cardimage} src={category.defaultImageUrl} />
        <Text style={styles.cardname}>{category.name}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardcontainer: {
    marginTop: 5,
    marginRight: 15,
  },
  cardwrapper: {
    display: "flex",
    flexDirection: "column",
  },
  cardimage: {
    width: 100,
    height: 80,
    borderRadius: 10,
  },
  cardname: {
    color: "#fff",
    marginTop: 5,
    fontSize: 10,
    textAlign: "center",
    fontFamily: "poppinsbold",
  },
});
