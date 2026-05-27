import { View, Text, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute, useNavigation } from "@react-navigation/native";
import Colors from "../../../constants/Colors";
import Button from "../../../components/Button";
import Button_2 from "../../../components/Button_2";

const ScanResult = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { message, percentage, resultType, tagName, photoUri } =
    route.params || {};

  const isCataract = resultType === "cataract";
  const isNormal = resultType === "normal";
  const isNotEye = resultType === "invalid";

  const displayMessage = message;

  // const displayPercentage = percentage
  //   ? `${Number(percentage).toFixed(0)}%`
  //   : "0%";

  const displayPercentage =
    !isNotEye && percentage ? `${Number(percentage).toFixed(0)}%` : null;

  return (
    <LinearGradient
      colors={[Colors.primary100, Colors.primary400]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeView}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Scan Results</Text>
          <View>
            <Text style={styles.scanResultMessage}>{displayMessage}</Text>
            {displayPercentage && (
              <Text style={styles.scanResultPercentage}>
                {displayPercentage}
              </Text>
            )}
          </View>
        </View>

        <View style={styles.imagContainer}>
          {isNotEye ? (
            <Image style={styles.noCataractIcon} source={{ uri: photoUri }} />
          ) : isCataract ? (
            <Image style={styles.image} source={{ uri: photoUri }} />
          ) : (
            <Image style={styles.noCataractIcon} source={{ uri: photoUri }} />
          )}
        </View>

        <View style={styles.buttonContainer}>
          {isNotEye ? (
            <>
              <Button
                onPress={() => navigation.navigate("Camera")}
                label="Retake Image"
              />
              <Button_2
                onPress={() => navigation.navigate("MainTabs")}
                label="Home"
              />
            </>
          ) : isCataract ? (
            <>
              <Button
                label="Find Nearby Clinics"
                onPress={() => navigation.navigate("FindNearByClinics")}
              />
              <View style={styles.innerButtonContainer}>
                <Button_2
                  onPress={() => navigation.navigate("Camera")}
                  label="New Scan"
                />
                <Button_2
                  onPress={() => navigation.navigate("MainTabs")}
                  label="Home Page"
                />
              </View>
            </>
          ) : (
            <>
              <Button
                onPress={() => navigation.navigate("Camera")}
                label="Retake"
              />
              <Button_2
                onPress={() => navigation.navigate("MainTabs")}
                label="Home"
              />
            </>
          )}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default ScanResult;

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 10,
    paddingVertical: 30,
  },
  textContainer: {
    justifyContent: "center",
    alignContent: "center",
  },
  text: {
    color: Colors.accent100,
    textAlign: "center",
    fontFamily: "Montserrat-Bold",
    opacity: 0.5,
    fontSize: 35,
  },
  scanResultMessage: {
    color: Colors.accent100,
    textAlign: "center",
    fontFamily: "Montserrat-Bold",
    fontSize: 30,
    marginTop: 10,
  },
  scanResultPercentage: {
    color: Colors.accent100,
    textAlign: "center",
    fontFamily: "Montserrat-Bold",
    fontSize: 28,
    marginTop: 5,
  },
  imagContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noCataractIcon: {
    width: 200,
    height: 200,
  },
  image: {
    width: "90%",
    height: "40%",
    borderWidth: 3,
    borderColor: Colors.accent100,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  buttonContainer: {
    flexDirection: "column",
    gap: 30,
  },
  innerButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});
