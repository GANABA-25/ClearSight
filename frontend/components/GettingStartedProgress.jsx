import { View, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";

const GettingStartedProgress = () => {
  const route = useRoute();
  const currentScreen = route.name;

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.bar,
          currentScreen === "DetectCataracts" && styles.progressColor,
        ]}
      />
      <View
        style={[
          styles.bar,
          currentScreen === "LearnAboutCataracts" && styles.progressColor,
        ]}
      />
      <View
        style={[
          styles.bar,
          currentScreen === "FindClinics" && styles.progressColor,
        ]}
      />
    </View>
  );
};

export default GettingStartedProgress;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  bar: {
    backgroundColor: "gray",
    width: 50,
    height: 6,
    borderRadius: 30,
    marginHorizontal: 5,
  },
  progressColor: {
    backgroundColor: "white",
  },
});
