import Constants from "expo-constants";
import { useState, useEffect, useRef } from "react";
import { useRoute } from "@react-navigation/native";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

import { usePost } from "../../hooks/usePost";
import { postUri } from "../../http";
import Colors from "../../constants/Colors";
import Button from "../../components/Button";

import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const ForgotPasswordOtpVerification = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const phoneNumber = route.params?.phoneNumber;
  const inputRefs = useRef([]);
  const [otpErrorMsg, setOtpErrorMsg] = useState("");
  const [focusedIndex, setFocusedIndex] = useState(null);
  const RESET_PASSWORD_OTP_VERIFICATION_URL =
    Constants.expoConfig?.extra?.RESET_PASSWORD_OTP_VERIFICATION_URL;
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const inputChangeHandler = (index, value) => {
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }

      if (!value && index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const {
    isLoading,
    setIsLoading,
    setPostResponse,
    postResponse,
    setErrorMsg,
    errorMsg,
    postData,
  } = usePost(postUri);

  const OtpSubmitHandler = () => {
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      setOtpErrorMsg("Please enter a complete 6-digit OTP");
      setIsLoading(false);

      const timeOutId = setTimeout(() => {
        setOtpErrorMsg(null);
      }, 3000);

      return () => clearTimeout(timeOutId);
    }

    postData(RESET_PASSWORD_OTP_VERIFICATION_URL, {
      otp: otpString,
      phoneNumber: phoneNumber,
    });
  };

  useEffect(() => {
    if (postResponse?.status === 200) {
      const timeOutId = setTimeout(() => {
        navigation.navigate("NewPassword", {
          userId: postResponse.data._id,
        });
        setPostResponse(null);
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
              <Text style={styles.headerText}>Verification code</Text>
              <Text style={styles.description}>
                Enter the 6-digits Verification code we sent to your phone
                Number
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
              {otpErrorMsg && (
                <View style={styles.errorMsgContainer}>
                  <MaterialIcons name="error-outline" size={34} color="red" />
                  <Text style={styles.errorMsg}>{otpErrorMsg}</Text>
                </View>
              )}
              {errorMsg && (
                <View style={styles.errorMsgContainer}>
                  <MaterialIcons name="error-outline" size={34} color="red" />
                  <Text style={styles.errorMsg}>saffdjagsjfgshgfaj</Text>
                </View>
              )}
              <View style={styles.otpContainer}>
                {otp.map((digit, index) => (
                  <TextInput
                    key={index}
                    ref={(ref) => (inputRefs.current[index] = ref)}
                    style={[
                      styles.otpInput,
                      focusedIndex === index && styles.focusOtpInput,
                    ]}
                    maxLength={1}
                    keyboardType="number-pad"
                    autoCorrect={false}
                    value={digit}
                    onFocus={() => setFocusedIndex(index)}
                    onChangeText={(value) => inputChangeHandler(index, value)}
                    selectTextOnFocus={true}
                  />
                ))}
              </View>
            </View>
          </View>

          <Button
            label="Verify"
            onPress={OtpSubmitHandler}
            isLoading={isLoading}
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default ForgotPasswordOtpVerification;

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
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    fontFamily: "Montserrat-Regular",
    fontSize: 18,
  },
  otpInput: {
    width: 45,
    borderWidth: 0.9,
    borderColor: Colors.accent100,
    color: Colors.accent100,
    borderRadius: 8,
    textAlign: "center",
    fontSize: 24,
    marginHorizontal: 4,
  },
  focusOtpInput: {
    borderColor: "green",
  },
  successMsgContainer: {
    alignItems: "center",
    gap: 10,
    marginBottom: 30,
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
});
