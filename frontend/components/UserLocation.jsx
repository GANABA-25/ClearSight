import { useState, useEffect } from "react";
import { Platform, Text, View, StyleSheet } from "react-native";

import * as Location from "expo-location";
import Colors from "../constants/Colors";

const UserLocation = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }

    getCurrentLocation();
  }, []);

  let text = "Waiting...";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>{text}</Text>
    </View>
  );
};

export default UserLocation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  paragraph: {
    color: Colors.accent100,
    fontSize: 25,
    textAlign: "center",
  },
});
