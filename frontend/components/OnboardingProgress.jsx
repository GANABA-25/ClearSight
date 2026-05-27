import { View, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";

const OnboardingProgress = () => {
  const route = useRoute();
  const currentScreen = route.name;

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.bar,
          currentScreen === "GlassesInformation" && styles.progressColor,
        ]}
      />
      <View
        style={[
          styles.bar,
          currentScreen === "EyeHistory" && styles.progressColor,
        ]}
      />
      <View
        style={[
          styles.bar,
          currentScreen === "FamilyHistory" && styles.progressColor,
        ]}
      />
      <View
        style={[
          styles.bar,
          currentScreen === "DiabetesOrHypertensionInformation" &&
            styles.progressColor,
        ]}
      />
    </View>
  );
};

export default OnboardingProgress;

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
