import { View, Text, StyleSheet, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Colors from "../../../constants/Colors";
import LearnAboutCataractCard from "../../../components/LearnAboutCataractCard";

import Ionicons from "@expo/vector-icons/Ionicons";

const causesOfCataractData = [
  {
    id: 1,
    imageUri:
      "https://res.cloudinary.com/dmdnq9vh8/image/upload/v1756809491/ClearSight/Sun_bbbf2y.png",
    description: "Prolonged exposure to UV radiation",
  },
  {
    id: 2,
    imageUri:
      "https://res.cloudinary.com/dmdnq9vh8/image/upload/v1756809490/ClearSight/Eye_dlrskz.png",
    description: "Eye injuries of surgeries",
  },
  {
    id: 3,
    imageUri:
      "https://res.cloudinary.com/dmdnq9vh8/image/upload/v1756809490/ClearSight/Blood_mzr5an.png",
    description: "Certain medical conditions like diabetes",
  },
  {
    id: 4,
    imageUri:
      "https://res.cloudinary.com/dmdnq9vh8/image/upload/v1756809491/ClearSight/DNA_kjy7gu.png",
    description: "Genetic predisposition",
  },
];

const CauseOfCataract = () => {
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
            <Text style={styles.topic}>Cause of Cataract</Text>
            <Text style={styles.description}>
              Understand the various factors that can contribute to the
              formation of cataract
            </Text>
          </View>

          <LearnAboutCataractCard data={causesOfCataractData} />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default CauseOfCataract;

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
    fontSize: 35,
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
