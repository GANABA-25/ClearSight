import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  Animated,
  Easing,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef } from "react";
import Colors from "../../../constants/Colors";

const ScanEye = () => {
  const route = useRoute();
  const { photoUri } = route.params || {};

  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [pulseAnim]);

  return (
    <LinearGradient
      colors={["#2c7bc5ff", "#142331", "#1e4467ff"]}
      style={styles.container}
    >
      <View style={styles.imageContainer}>
        {photoUri && (
          <Animated.View
            style={[styles.glowRing, { transform: [{ scale: pulseAnim }] }]}
          >
            <Image source={{ uri: photoUri }} style={styles.image} />
          </Animated.View>
        )}
      </View>

      <View style={styles.textContainer}>
        <ActivityIndicator size="large" color={Colors.accent100} />
        <Text style={styles.text}>Scanning...</Text>
      </View>
    </LinearGradient>
  );
};

export default ScanEye;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 60,
  },
  glowRing: {
    borderWidth: 4,
    borderColor: Colors.primary300,
    shadowColor: Colors.primary300,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 30,
    borderRadius: 150,
    padding: 10,
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 150,
    resizeMode: "cover",
  },
  textContainer: {
    alignItems: "center",
    gap: 10,
  },
  text: {
    fontSize: 22,
    color: Colors.accent100,
    fontFamily: "Montserrat-Bold",
    textAlign: "center",
    marginTop: 10,
    letterSpacing: 1,
  },
});
