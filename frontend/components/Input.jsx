import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";

import Colors from "../constants/Colors";

import Ionicons from "@expo/vector-icons/Ionicons";

const Input = ({
  label,
  type = "text",
  TextInputConfig,
  icon,
  showPassword,
  hidePassword,
  onPress,
  viewPassword,
  hasError,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[styles.inputContainer, hasError && styles.emptyInputsError]}
      >
        {icon && (
          <Ionicons
            name={icon}
            size={20}
            color={Colors.accent100}
            style={styles.icon}
          />
        )}
        <TextInput
          style={[styles.input, { fontSize: 12 }, icon && { paddingLeft: 35 }]}
          placeholderTextColor={Colors.accent100}
          secureTextEntry={type === "password" ? !viewPassword : false}
          {...TextInputConfig}
        />

        {type === "password" && showPassword && (
          <Pressable onPress={onPress} style={styles.showPassword}>
            {!viewPassword ? (
              <Ionicons
                name={showPassword}
                size={20}
                color={Colors.accent100}
              />
            ) : (
              <Ionicons
                name={hidePassword}
                size={20}
                color={Colors.accent100}
              />
            )}
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  label: {
    fontFamily: "OpenSans-Bold",
    fontSize: 15,
    color: "white",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  icon: {
    position: "absolute",
    left: 10,
  },
  showPassword: {
    position: "absolute",
    right: 10,
    zIndex: 1,
  },
  input: {
    flex: 1,
    height: 40,
    color: Colors.accent100,
  },
  emptyInputsError: {
    borderColor: "red",
  },
});
