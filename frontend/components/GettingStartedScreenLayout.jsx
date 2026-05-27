import {
  Text,
  View,
  StyleSheet,
  Image,
  useWindowDimensions,
} from "react-native";
import Button from "./Button";
import GettingStartedProgress from "./GettingStartedProgress";

import Entypo from "@expo/vector-icons/Entypo";

const GettingStartedScreenLayout = ({ title, imageUri, onNext }) => {
  const { width, height } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={[styles.text, { fontSize: width * 0.08 }]}>{title}</Text>

        <View style={styles.imageContainer}>
          <Image
            source={{ uri: imageUri }}
            style={[
              styles.image,
              {
                height: height * 0.4,
              },
            ]}
            resizeMode="cover"
          />

          <Entypo
            style={[styles.icon, { top: height * 0.3, left: width * 0.18 }]}
            name="eye"
            size={width * 0.14}
            color="white"
          />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <GettingStartedProgress />
        <View style={{ marginTop: 20 }}>
          <Button label="Get Started" onPress={onNext} />
        </View>
      </View>
    </View>
  );
};

export default GettingStartedScreenLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
    justifyContent: "space-between",
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    fontFamily: "Montserrat-ExtraBold",
    color: "white",
    marginBottom: 20,
    textAlign: "center",
  },
  imageContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    borderRadius: 20,
  },
  icon: {
    position: "absolute",
    transform: [{ rotate: "-10deg" }],
  },
  buttonContainer: {
    alignItems: "center",
    paddingBottom: 20,
  },
});
