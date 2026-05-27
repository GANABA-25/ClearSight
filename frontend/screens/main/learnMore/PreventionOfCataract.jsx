import { View, Text, StyleSheet, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Colors from "../../../constants/Colors";

import LearnAboutCataractCard from "../../../components/LearnAboutCataractCard";
import Ionicons from "@expo/vector-icons/Ionicons";

const preventionOfCataractData = [
  {
    id: 1,
    imageUri:
      "https://res.cloudinary.com/dmdnq9vh8/image/upload/v1756809490/ClearSight/Glasses_g1tlnq.png",
    description: "Wearing sunglasses with UV protection",
  },
  {
    id: 2,
    imageUri:
      "https://res.cloudinary.com/dmdnq9vh8/image/upload/v1756809491/ClearSight/Soup_u6bwrg.png",
    description: "Maintaining a healthy diet rich in antioxidants",
  },
  {
    id: 3,
    imageUri:
      "https://res.cloudinary.com/dmdnq9vh8/image/upload/v1756809491/ClearSight/Syringe_nimi2l.png",
    description: "Managing underlying health conditions",
  },
  {
    id: 4,
    imageUri:
      "https://res.cloudinary.com/dmdnq9vh8/image/upload/v1756809491/ClearSight/No_Smoking_qkodgb.png",
    description: "Avoiding smoking and excessive alcohol consumption",
  },
];

const PreventionOfCataract = () => {
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
            <Text style={styles.topic}>Prevention of Cataract</Text>
            <Text style={styles.description}>
              Learn about steps you can take to help maintain your eye health
              and potentially reduce the risk of cataract
            </Text>
          </View>

          <LearnAboutCataractCard data={preventionOfCataractData} />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default PreventionOfCataract;

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
