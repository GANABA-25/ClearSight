import Constants from "expo-constants";
import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

import Input from "../../components/Input";
import Button from "../../components/Button";
import { usePost } from "../../hooks/usePost";
import { postUri } from "../../http";

import Colors from "../../constants/Colors";

import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const ForgotPasswordEmailVerification = () => {
  const RESET_PASSWORD_EMAIL_VERIFICATION_URL =
    Constants.expoConfig?.extra?.RESET_PASSWORD_EMAIL_VERIFICATION_URL;
  const navigation = useNavigation();
  const [emailVerification, setEmailVerification] = useState({
    email: "",
  });

  const inputChangeHandler = (inputIdentifier, enteredValue) => {
    setEmailVerification((prevState) => {
      return { ...prevState, [inputIdentifier]: enteredValue };
    });
  };

  const {
    isLoading,
    setPostResponse,
    postResponse,
    setErrorMsg,
    errorMsg,
    postData,
  } = usePost(postUri);

  const EmailVerificationHandler = () => {
    postData(RESET_PASSWORD_EMAIL_VERIFICATION_URL, emailVerification);
  };

  useEffect(() => {
    if (postResponse?.status === 200) {
      const timeOutId = setTimeout(() => {
        setPostResponse(null);
        navigation.navigate("ForgotPasswordOtpVerification", {
          phoneNumber: postResponse.data.phoneNumber,
        });
      }, 3000);

      return () => clearTimeout(timeOutId);
    }

    if (errorMsg) {
      const timeOutId = setTimeout(() => {
        setErrorMsg(null);
      }, 3000);

      return () => clearTimeout(timeOutId);
    }
  }, [postResponse, errorMsg]);

  return (
    <LinearGradient
      colors={[Colors.primary100, Colors.primary400]}
      style={styles.outerContainer}
    >
      <SafeAreaView style={styles.safeView}>
        <View style={styles.container}>
          <Pressable onPress={() => navigation.goBack()} style={styles.icon}>
            <Ionicons name="arrow-back" size={30} color="white" />
          </Pressable>
          <View style={styles.innerContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.headerText}>Forgot Password</Text>
              <Text style={styles.description}>
                Enter the email address associated wIth your account and we will
                send you a one-time-password(OTP) to verify uor identity
              </Text>
            </View>
            <View>
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
              {errorMsg?.message ? (
                <View style={styles.errorMsgContainer}>
                  <MaterialIcons name="error-outline" size={34} color="red" />
                  <Text style={styles.errorMessage}>{errorMsg?.message}</Text>
                </View>
              ) : (
                ""
              )}
              <Input
                label="Email"
                TextInputConfig={{
                  autoCorrect: false,
                  placeholder: "Enter your Email Address",
                  onChangeText: (text) => inputChangeHandler("email", text),
                  value: emailVerification.email,
                  keyboardType: "email-address",
                }}
              />
            </View>
          </View>

          <Button
            label="Proceed"
            onPress={EmailVerificationHandler}
            isLoading={isLoading}
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default ForgotPasswordEmailVerification;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  safeView: {
    flex: 1,
  },
  icon: {
    borderColor: Colors.accent100,
    borderWidth: 1,
    width: 50,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 10,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 50,
  },
  innerContainer: {
    flex: 1,
    gap: 100,
  },
  textContainer: {
    gap: 20,
  },
  headerText: {
    fontFamily: "Montserrat-Bold",
    color: "white",
    fontSize: 35,
    textAlign: "center",
  },
  description: {
    color: "gray",
    fontFamily: "Montserrat-Regular",
    fontSize: 20,
    textAlign: "center",
  },
  successMsgContainer: {
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  successMsg: {
    fontFamily: "Montserrat-Regular",
    color: Colors.accent100,
  },
  errorMsgContainer: {
    alignItems: "center",
    gap: 10,
    marginBottom: 30,
  },
  errorMsg: {
    fontFamily: "Montserrat-Regular",
    color: "red",
  },
  errorMessage: {
    color: "red",
    fontFamily: "Montserrat-Regular",
    fontSize: 14,
    marginBottom: 12,
  },
});
