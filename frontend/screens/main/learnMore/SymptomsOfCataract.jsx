import { View, Text, StyleSheet, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Colors from "../../../constants/Colors";

import LearnAboutCataractCard from "../../../components/LearnAboutCataractCard";
import Ionicons from "@expo/vector-icons/Ionicons";

const symptomsOfCataractData = [
  {
    id: 1,
    imageUri:
      "https://res.cloudinary.com/dmdnq9vh8/image/upload/v1756809490/ClearSight/Cloud_cqpedv.png",
    description: "Blurred or cloudy vision",
  },
  {
    id: 2,
    imageUri:
      "https://res.cloudinary.com/dmdnq9vh8/image/upload/v1756809491/ClearSight/Sun_bbbf2y.png",
    description: "Increase sensitivity to light and glare",
  },
  {
    id: 3,
    imageUri:
      "https://res.cloudinary.com/dmdnq9vh8/image/upload/v1756809491/ClearSight/Night_td0l4w.png",
    description: "Difficulty seeing at night",
  },
  {
    id: 4,
    imageUri:
      "https://res.cloudinary.com/dmdnq9vh8/image/upload/v1756809491/ClearSight/Rainbow_j6aqtz.png",
    description: "Fading or yellowing of colors",
  },
];

const SymptomsOfCataract = () => {
  const navigation = useNavigation();
  return (
    <LinearGradient
      colors={[Colors.primary100, Colors.primary400]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeView}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Pressable onPress={() => navigation.goBack()} style={styles.icon}>
              <Ionicons name="arrow-back" size={30} color="white" />
            </Pressable>
          </View>
          <View style={styles.innerContainer}>
            <Text style={styles.topic}>Symptoms of Cataract</Text>
            <Text style={styles.description}>
              Learn about common symptoms associated with cataract. this
              information is for educational purposes only.
            </Text>
          </View>

          <LearnAboutCataractCard data={symptomsOfCataractData} />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default SymptomsOfCataract;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  safeView: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 20,
  },
  icon: {
    borderColor: Colors.accent100,
    borderWidth: 1,
    width: 50,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  innerContainer: {
    marginBottom: 30,
    alignItems: "center",
  },
  topic: {
    fontFamily: "Montserrat-Bold",
    fontSize: 30,
    color: Colors.accent100,
    textAlign: "center",
    marginBottom: 10,
  },
  description: {
    fontFamily: "Montserrat-Regular",
    color: Colors.accent100,
    textAlign: "center",
    fontSize: 16,
  },
});
