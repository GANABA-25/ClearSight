import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Colors from "../../../constants/Colors";

import Ionicons from "@expo/vector-icons/Ionicons";

const learnAboutCataractQuestions = [
  {
    id: 1,
    question: "What is cataract?",
    screen: "WhatIsCataract",
    imageUri:
      "https://res.cloudinary.com/dmdnq9vh8/image/upload/v1756805429/ClearSight/WhatIsCATARACT_mw62mc.png",
  },
  {
    id: 2,
    question: "Cause of cataract",
    screen: "CauseOfCataract",
    imageUri:
      "https://res.cloudinary.com/dmdnq9vh8/image/upload/v1756805428/ClearSight/causes_OfCataract_uiwmvk.png",
  },
  {
    id: 3,
    question: "Symptoms of cataract",
    screen: "SymptomsOfCataract",
    imageUri:
      "https://res.cloudinary.com/dmdnq9vh8/image/upload/v1756805429/ClearSight/symptomsOfCataract_nsiygd.png",
  },
  {
    id: 4,
    question: "Prevention of cataract",
    screen: "PreventionOfCataract",
    imageUri:
      "https://res.cloudinary.com/dmdnq9vh8/image/upload/v1756805429/ClearSight/Prevention_ctlvvt.png",
  },
];

const LearnMore = () => {
  const navigation = useNavigation();
  return (
    <LinearGradient
      colors={[Colors.primary100, Colors.primary400]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeView}>
        <View style={styles.headerContainer}>
          <Pressable onPress={() => navigation.goBack()} style={styles.icon}>
            <Ionicons name="arrow-back" size={30} color="white" />
          </Pressable>
          <Image source={require("../../../assets/images/Menu.png")} />
        </View>

        <Text style={styles.text}>LearnMore</Text>

        <View style={styles.innerContainer}>
          <FlatList
            data={learnAboutCataractQuestions}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => navigation.navigate(item.screen)}
                android_ripple={{ color: "#ccc", borderless: false }}
                style={({ pressed }) => [
                  styles.questionContainer,
                  pressed && styles.pressed,
                ]}
              >
                <Text style={styles.questionText}>{item.question}</Text>
                <Image
                  style={styles.image}
                  source={{
                    uri: item.imageUri,
                  }}
                />
              </Pressable>
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default LearnMore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  safeView: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  icon: {
    borderColor: Colors.accent100,
    borderWidth: 1,
    width: 50,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  text: {
    fontFamily: "Montserrat-Bold",
    color: Colors.accent100,
    textAlign: "center",
    fontSize: 30,
  },
  questionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
  },
  questionText: {
    color: Colors.accent100,
    fontFamily: "Montserrat-Regular",
    fontSize: 20,
  },
  image: {
    width: 50,
    height: 50,
  },
  innerContainer: {
    marginTop: 50,
  },
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
});
