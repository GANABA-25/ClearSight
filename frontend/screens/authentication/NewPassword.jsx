import Constants from "expo-constants";
import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { validateResetPasswordData } from "../../util/validation";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

import { usePost } from "../../hooks/usePost";
import { postUri } from "../../http";

import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const NewPassword = () => {
  const NEW_PASSWORD_URL = Constants.expoConfig?.extra?.NEW_PASSWORD_URL;
  const route = useRoute();
  const userId = route.params?.userId;
  const navigation = useNavigation();
  const [viewPassword, setViewPassword] = useState(false);
  const [viewConfirmPassword, setConfirmPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState({});
  const [resetPassword, setResetPassword] = useState({
    newPassword: "",
    confirmNewPassword: "",
    userId: userId,
  });

  const inputChangeHandler = (inputIdentifier, enteredValue) => {
    setResetPassword((prevState) => {
      return { ...prevState, [inputIdentifier]: enteredValue };
    });

    setErrorMsg((prevErrors) => ({
      ...prevErrors,
      [inputIdentifier]: "",
    }));
  };

  const viewPasswordHandler = () => {
    setViewPassword((prevState) => !prevState);
  };

  const viewConfirmPasswordHandler = () => {
    setConfirmPassword((prevState) => !prevState);
  };

  const {
    isLoading,
    setIsLoading,
    setPostResponse,
    postResponse,
    setErrorMsg: setPostErrorMsg,
    errorMsg: postErrorMsg,
    postData,
    clearPostResponse,
  } = usePost(postUri);

  const resetPasswordHandler = () => {
    const errors = validateResetPasswordData(resetPassword);

    setErrorMsg(errors);

    if (Object.values(errors).some((error) => error !== "")) {
      setIsLoading(false);
      return;
    }

    postData(NEW_PASSWORD_URL, resetPassword);
  };

  useEffect(() => {
    if (postResponse?.status === 200) {
      const timeOutId = setTimeout(() => {
        setPostResponse(null);
        navigation.navigate("Signin");
      }, 3000);

      return () => clearTimeout(timeOutId);
    }

    if (postErrorMsg) {
      const timeOutId = setTimeout(() => {
        setPostErrorMsg(null);
      }, 3000);

      return () => clearTimeout(timeOutId);
    }
  }, [postResponse, postErrorMsg]);

  return (
    <LinearGradient
      colors={[Colors.primary100, Colors.primary400]}
      style={styles.outerContainer}
    >
      <SafeAreaView style={styles.safeView}>
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.headerText}>Enter new password</Text>
              <Text style={styles.description}>
                Time for a fresh start! Use at least 8 characters and
                combinations of uppercase , lowercase, numbers and symbols
              </Text>
            </View>
            {postResponse?.data.message ? (
              <View style={styles.successMsgContainer}>
                <Ionicons
                  name="checkmark-done-circle"
                  size={34}
                  color={Colors.accent100}
                />
                <Text style={styles.successMsg}>
                  {postResponse?.data?.message}
                </Text>
              </View>
            ) : (
              ""
            )}
            {postErrorMsg && (
              <View style={styles.errorMsgContainer}>
                <MaterialIcons name="error-outline" size={34} color="red" />
                <Text style={styles.errorMsg}>{postErrorMsg?.message}</Text>
              </View>
            )}
            <View style={styles.inputContainer}>
              <View>
                <Input
                  label="New Password"
                  type={viewPassword ? "text" : "password"}
                  icon="lock-closed-outline"
                  showPassword="eye-outline"
                  hidePassword="eye-off-outline"
                  onPress={viewPasswordHandler}
                  TextInputConfig={{
                    autoCorrect: false,
                    placeholder: "Enter new password",
                    onChangeText: (text) =>
                      inputChangeHandler("newPassword", text),
                    value: resetPassword.newPassword,
                    secureTextEntry: !viewPassword,
                  }}
                  hasError={!!errorMsg.newPassword}
                />
                {errorMsg.newPassword ? (
                  <Text style={styles.errorMessage}>
                    {errorMsg.newPassword}
                  </Text>
                ) : null}
              </View>
              <View>
                <Input
                  label="Confirm New Password"
                  type={viewConfirmPassword ? "text" : "password"}
                  icon="lock-closed-outline"
                  showPassword="eye-outline"
                  hidePassword="eye-off-outline"
                  onPress={viewConfirmPasswordHandler}
                  TextInputConfig={{
                    autoCorrect: false,
                    placeholder: "Confirm new password",
                    onChangeText: (text) =>
                      inputChangeHandler("confirmNewPassword", text),
                    value: resetPassword.confirmNewPassword,
                    secureTextEntry: !viewConfirmPassword,
                  }}
                  hasError={!!errorMsg.confirmNewPassword}
                />
                {errorMsg.confirmNewPassword ? (
                  <Text style={styles.errorMessage}>
                    {errorMsg.confirmNewPassword}
                  </Text>
                ) : null}
              </View>
            </View>
          </View>

          <Button
            label="Submit"
            onPress={resetPasswordHandler}
            isLoading={isLoading}
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default NewPassword;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  safeView: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 60,
  },
  innerContainer: {
    flex: 1,
    gap: 40,
  },
  textContainer: {
    gap: 20,
  },
  headerText: {
    fontFamily: "Montserrat-Bold",
    color: "white",
    fontSize: 30,
    textAlign: "center",
  },
  description: {
    color: "gray",
    fontFamily: "Montserrat-Regular",
    fontSize: 20,
    textAlign: "center",
  },
  inputContainer: {
    gap: 30,
  },
  errorMessage: {
    fontFamily: "Montserrat-Regular",
    color: "red",
    fontSize: 14,
    marginTop: 8,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    fontFamily: "Montserrat-Regular",
    fontSize: 18,
  },
  successMsgContainer: {
    alignItems: "center",
    gap: 10,
  },
  successMsg: {
    fontFamily: "Montserrat-Regular",
    color: Colors.accent100,
  },
  errorMsgContainer: {
    alignItems: "center",
    gap: 10,
  },
  errorMsg: {
    fontFamily: "Montserrat-Regular",
    color: "red",
  },
});
