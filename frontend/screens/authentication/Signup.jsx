import Constants from "expo-constants";
import { useState, useEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";

import { usePost } from "../../hooks/usePost";
import { postUri } from "../../http";

import Input from "../../components/Input";
import Colors from "../../constants/Colors";
import Button from "../../components/Button";
import { validateSignUpData } from "../../util/validation";

import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const Signup = () => {
  const [signupErrorMsg, setSignupErrorMsg] = useState({});
  const [isSignupLoading, setIsSignupLoading] = useState(false);
  const SIGN_UP_URL = Constants.expoConfig?.extra?.SIGN_UP_URL;
  const navigation = useNavigation();
  const route = useRoute();
  const currentScreen = route.name;
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [viewPassword, setViewPassword] = useState(false);
  const [viewConfirmPassword, setConfirmPassword] = useState(false);

  const inputChangeHandler = (inputIdentifier, enteredValue) => {
    setSignupData((prevState) => {
      return { ...prevState, [inputIdentifier]: enteredValue };
    });

    setSignupErrorMsg((prevErrors) => ({
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

  const { isLoading, postResponse, errorMsg, postData, clearPostResponse } =
    usePost(postUri);

  const SubmitHandler = () => {
    setIsSignupLoading(true);
    const errors = validateSignUpData(signupData);

    setSignupErrorMsg(errors);

    if (Object.values(errors).some((error) => error !== "")) {
      setIsSignupLoading(false);
      return;
    }

    console.log("clicked");
    postData(SIGN_UP_URL, signupData);
  };

  useEffect(() => {
    if (postResponse?.status === 200) {
      setSignupData({
        fullName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
      });
      setIsSignupLoading(false);

      const timeOutId = setTimeout(() => {
        clearPostResponse();
        navigation.navigate("Signin");
      }, 3000);

      return () => clearTimeout(timeOutId);
    }

    if (errorMsg) {
      setSignupErrorMsg(errorMsg);
      setIsSignupLoading(false);
    }
  }, [postResponse, errorMsg]);

  return (
    <LinearGradient
      colors={[Colors.primary100, Colors.primary400]}
      style={styles.outerContainer}
    >
      <SafeAreaView style={styles.safeView}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keyboardAvoidingView}
            keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
          >
            <ScrollView
              contentContainerStyle={styles.scrollContainer}
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.innerContainer}>
                <Text style={styles.text}>
                  Sign Up or Login in to your account
                </Text>
                <View style={styles.signLoginContainer}>
                  <Pressable onPress={() => navigation.navigate("Signin")}>
                    <Text style={styles.signLoginText}>Login</Text>
                  </Pressable>
                  <Text
                    style={[
                      styles.signLoginText,
                      currentScreen === "Signup" &&
                        styles.loginSignTextBackgroundColor,
                    ]}
                  >
                    Signup
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
                ) : null}
                {errorMsg?.message ? (
                  <View style={styles.errorMsgContainer}>
                    <MaterialIcons name="error-outline" size={34} color="red" />
                    <Text style={styles.errorMsg}>{errorMsg?.message}</Text>
                  </View>
                ) : (
                  ""
                )}
                <View>
                  <Input
                    label="Full Name"
                    TextInputConfig={{
                      autoCorrect: false,
                      placeholder: "Enter Full Name",
                      onChangeText: (text) =>
                        inputChangeHandler("fullName", text),
                      value: signupData.fullName,
                    }}
                    hasError={!!signupErrorMsg.fullName}
                  />
                  {signupErrorMsg.fullName ? (
                    <Text style={styles.errorMessage}>
                      {signupErrorMsg.fullName}
                    </Text>
                  ) : null}
                </View>
                <View>
                  <Input
                    label="Email"
                    TextInputConfig={{
                      autoCorrect: false,
                      placeholder: "Enter Email Address",
                      onChangeText: (text) => inputChangeHandler("email", text),
                      value: signupData.email,
                      keyboardType: "email-address",
                    }}
                    hasError={!!signupErrorMsg.email}
                  />
                  {signupErrorMsg.email ? (
                    <Text style={styles.errorMessage}>
                      {signupErrorMsg.email}
                    </Text>
                  ) : null}
                </View>

                <View>
                  <Input
                    label="Phone Number"
                    type="number"
                    TextInputConfig={{
                      autoCorrect: false,
                      placeholder: "Enter Phone Number",
                      onChangeText: (text) =>
                        inputChangeHandler("phoneNumber", text),
                      value: signupData.phoneNumber,
                      keyboardType: "phone-pad",
                    }}
                    hasError={!!signupErrorMsg.phoneNumber}
                  />
                  {signupErrorMsg.phoneNumber ? (
                    <Text style={styles.errorMessage}>
                      {signupErrorMsg.phoneNumber}
                    </Text>
                  ) : null}
                </View>

                <View>
                  <Input
                    label="Password"
                    type={viewPassword ? "text" : "password"}
                    icon="lock-closed-outline"
                    showPassword="eye-outline"
                    hidePassword="eye-off-outline"
                    onPress={viewPasswordHandler}
                    TextInputConfig={{
                      autoCorrect: false,
                      placeholder: "Enter password",
                      onChangeText: (text) =>
                        inputChangeHandler("password", text),
                      value: signupData.password,
                      secureTextEntry: !viewPassword,
                    }}
                    hasError={!!signupErrorMsg.password}
                  />
                  {signupErrorMsg.password ? (
                    <Text style={styles.errorMessage}>
                      {signupErrorMsg.password}
                    </Text>
                  ) : null}
                </View>
                <View>
                  <Input
                    label="Confirm Password"
                    type={viewConfirmPassword ? "text" : "password"}
                    icon="lock-closed-outline"
                    showPassword="eye-outline"
                    hidePassword="eye-off-outline"
                    onPress={viewConfirmPasswordHandler}
                    TextInputConfig={{
                      autoCorrect: false,
                      placeholder: "Confirm password",
                      onChangeText: (text) =>
                        inputChangeHandler("confirmPassword", text),
                      value: signupData.confirmPassword,
                      secureTextEntry: !viewConfirmPassword,
                    }}
                    hasError={!!signupErrorMsg.confirmPassword}
                  />
                  {signupErrorMsg.confirmPassword ? (
                    <Text style={styles.errorMessage}>
                      {signupErrorMsg.confirmPassword}
                    </Text>
                  ) : null}
                </View>
              </View>

              <View style={styles.bottomSection}>
                <Button
                  label="Get Started"
                  onPress={SubmitHandler}
                  isLoading={isSignupLoading}
                />
                <View style={styles.loginOptionsContainer}>
                  <View style={styles.loginOptionView} />
                  <Text style={styles.loginOptionText}>Or login with</Text>
                  <View style={styles.loginOptionView} />
                </View>

                <View style={styles.icon}>
                  <Ionicons name="logo-google" size={35} color="red" />
                  <Text>Google</Text>
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Signup;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  safeView: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
    paddingVertical: 25,
    paddingHorizontal: 20,
  },
  innerContainer: {
    flexDirection: "column",
    gap: 10,
  },
  text: {
    fontFamily: "Montserrat-Bold",
    color: "white",
    textAlign: "center",
    fontSize: 35,
  },
  signLoginContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 40,
    backgroundColor: Colors.primary500,
    padding: 3,
  },
  signLoginText: {
    fontFamily: "Montserrat-Regular",
    color: "white",
    textAlign: "center",
    fontSize: 25,
    borderRadius: 40,
    paddingHorizontal: 40,
    paddingVertical: 5,
  },
  forgotPasswordContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  RememberMeText: {
    color: Colors.accent100,
  },
  forgotPasswordText: {
    color: Colors.primary300,
  },
  rememberMeContainer: {
    flexDirection: "row",
    gap: 10,
  },
  loginOptionsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  loginOptionView: {
    width: 120,
    height: 3,
    backgroundColor: "gray",
  },
  loginOptionText: {
    color: Colors.accent100,
  },
  loginSignTextBackgroundColor: {
    backgroundColor: Colors.primary600,
  },
  icon: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
  },
  bottomSection: {
    gap: 20,
    marginTop: 20,
  },
  errorMessage: {
    fontFamily: "Montserrat-Regular",
    color: "red",
    fontSize: 14,
    paddingTop: 8,
  },
  errorMsgContainer: {
    alignItems: "center",
    gap: 10,
    padding: 10,
  },
  errorMsg: {
    fontFamily: "Montserrat-Regular",
    color: "red",
  },
  successMsgContainer: {
    alignItems: "center",
    gap: 10,
    padding: 10,
  },
  successMsg: {
    fontFamily: "Montserrat-Bold",
    color: "white",
  },
});
