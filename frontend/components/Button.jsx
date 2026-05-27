import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import Colors from "../constants/Colors";

const Button = ({ label, onPress, isLoading, icon, style }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        pressed && styles.buttonPressed,
        style,
      ]}
    >
      <View style={styles.buttonContent}>
        {isLoading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <>
            {label && <Text style={styles.text}>{label}</Text>}
            {icon && <View style={styles.icon}>{icon}</View>}
          </>
        )}
      </View>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary100,
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 20,
  },

  buttonContent: {
    flexDirection: "row", // ✅ aligns icon + text horizontally
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
    fontSize: 18,
  },

  icon: {
    marginLeft: 8, // space between text and icon
  },
});
