import { View, Text, StyleSheet, Image, FlatList } from "react-native";

const LearnAboutCataractCard = ({ data }) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: item.imageUri }} />
          </View>
          <Text style={styles.causeText}>{item.description}</Text>
        </View>
      )}
      numColumns={2}
      columnWrapperStyle={styles.row}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default LearnAboutCataractCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    // alignItems: "center",
  },
  imageContainer: {
    backgroundColor: "gray",
    borderRadius: 10,
    padding: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  image: {
    width: 80,
    height: 80,
  },
  causeText: {
    color: "#ada8a8ff",
    fontFamily: "Montserrat-Regular",
    fontSize: 15,
    textAlign: "center",
  },
  row: {
    justifyContent: "space-between",
  },
});
