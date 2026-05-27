import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import Colors from "../constants/Colors";

const Button_2 = ({ label, onPress, isLoading }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        pressed && styles.buttonPressed,
      ]}
    >
      <View style={styles.button}>
        {isLoading ? (
          <ActivityIndicator size="small" color={Colors.accent100} />
        ) : (
          <Text style={styles.text}>{label}</Text>
        )}
      </View>
    </Pressable>
  );
};

export default Button_2;

const styles = StyleSheet.create({
  container: {
    borderRadius: 40,
    borderWidth: 2,
    borderColor: Colors.accent100,
    padding: 20,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  text: {
    fontFamily: "Montserrat-Bold",
    color: "white",
    fontSize: 24,
    textAlign: "center",
  },
});
