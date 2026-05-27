import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  FlatList,
} from "react-native";
import Maps from "../../../components/Maps";
import { useContext } from "react";
import { FindClinicsContext } from "../../../store/FindClinicsContext";

import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../../../constants/Colors";

import Ionicons from "@expo/vector-icons/Ionicons";

const listData = [
  {
    id: 1,
    clinicName: "Vision Care Clinic",
    location: "123 Main St, Osu, Accra",
  },
  {
    id: 2,
    clinicName: "BrightSight Eye Center",
    location: "45 Oxford Road, East Legon, Accra",
  },
  {
    id: 3,
    clinicName: "ClearView Optometry",
    location: "78 Independence Ave, Ridge, Accra",
  },
  {
    id: 4,
    clinicName: "Eye Health Hospital",
    location: "22 Ring Road Central, Accra",
  },
  {
    id: 5,
    clinicName: "Golden Vision Eye Clinic",
    location: "10 Labone Crescent, Labone, Accra",
  },
  {
    id: 6,
    clinicName: "OptiCare Eye Specialists",
    location: "5 Adenta Highway, Adenta, Accra",
  },
  {
    id: 7,
    clinicName: "Crystal Eye Clinic",
    location: "67 Spintex Road, Accra",
  },
  {
    id: 8,
    clinicName: "Accra Eye Center",
    location: "89 Kwame Nkrumah Ave, Accra",
  },
  {
    id: 9,
    clinicName: "Premier Vision Hospital",
    location: "31 Achimota Road, Accra",
  },
  {
    id: 10,
    clinicName: "SharpSight Eye Clinic",
    location: "14 Airport City Road, Accra",
  },
];

const FindNearByClinics = () => {
  const navigation = useNavigation();
  const [showMapOrList, setShowMapOrList] = useState(true);
  const { clinic } = useContext(FindClinicsContext);

  const toggleMapHandler = () => {
    setShowMapOrList(true);
  };

  const toggleListHandler = () => {
    setShowMapOrList(false);
  };

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
        <Text style={styles.text}>Find Clinic</Text>

        <View style={styles.loginSignContainer}>
          <Pressable onPress={toggleMapHandler}>
            <Text
              style={[
                styles.loginSignText,
                showMapOrList && styles.loginSignTextBackgroundColor,
              ]}
            >
              Map
            </Text>
          </Pressable>
          <Pressable onPress={toggleListHandler}>
            <Text
              style={[
                styles.loginSignText,
                !showMapOrList && styles.loginSignTextBackgroundColor,
              ]}
            >
              List
            </Text>
          </Pressable>
        </View>

        {showMapOrList ? (
          <View style={styles.map}>
            <Maps />
          </View>
        ) : (
          <>
            {clinic.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyClinic}>
                  No nearby clinics found. Please check the map for available
                  locations.
                </Text>
              </View>
            ) : (
              <FlatList
                data={clinic || []}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => (
                  <View style={styles.listContainer}>
                    <Text style={styles.clinicName}>{item.name}</Text>
                    <Text style={styles.clinicLocation}>{item.vicinity}</Text>
                  </View>
                )}
                contentContainerStyle={{ paddingTop: 20 }}
                showsVerticalScrollIndicator={false}
              />
            )}
          </>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
};

export default FindNearByClinics;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
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
  loginSignContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 40,
    backgroundColor: Colors.primary500,
    padding: 5,
    marginTop: 5,
  },
  loginSignText: {
    fontFamily: "Montserrat-Regular",
    color: "white",
    textAlign: "center",
    fontSize: 25,
    borderRadius: 40,
    paddingHorizontal: 40,
    paddingVertical: 5,
  },
  map: {
    flex: 1,
    marginTop: 20,
  },
  loginSignTextBackgroundColor: {
    backgroundColor: Colors.primary600,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyClinic: {
    color: Colors.accent100,
    fontFamily: "Montserrat-Bold",
    fontSize: 35,
  },
  listContainer: {
    flex: 1,
    gap: 3,
    paddingVertical: 10,
  },
  clinicName: {
    fontFamily: "Montserrat-Bold",
    color: Colors.accent100,
    fontSize: 15,
  },
  clinicLocation: {
    color: Colors.accent100,
    opacity: 0.5,
  },
});
