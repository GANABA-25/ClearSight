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
import Checkbox from "expo-checkbox";
// import * as WebBrowser from "expo-web-browser";
// import * as AuthSession from "expo-auth-session";
// import * as Google from "expo-auth-session/providers/google";

import { usePost } from "../../hooks/usePost";
import { postUri } from "../../http";
import { validateSignInData } from "../../util/validation";
import { useContext } from "react";
import { AuthContext } from "../../store/AuthContext";

import Input from "../../components/Input";
import Colors from "../../constants/Colors";
import Button from "../../components/Button";

import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

// WebBrowser.maybeCompleteAuthSession();

const Signin = () => {
  const { authenticate } = useContext(AuthContext);
  const [isChecked, setIsChecked] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const currentScreen = route.name;
  const [signinErrorMsg, setSigninErrorMsg] = useState({});
  const [viewPassword, setViewPassword] = useState(false);
  const [isSigninLoading, setIsSigninLoading] = useState(false);
  const SIGN_IN_URL = Constants.expoConfig?.extra?.SIGN_IN_URL;
  const [signinData, setSigninData] = useState({
    email: "",
    password: "",
  });

  // const redirectUri = AuthSession.makeRedirectUri({
  //   useProxy: true,
  // });

  // const { request, response, promptAsync } = Google.useAuthRequest({
  //   expoClientId:
  //     "376583342053-odgp6eovqial2hbbr43ijl9l90jo8jlg.apps.googleusercontent.com",
  //   iosClientId:
  //     "376583342053-4nfa1c53v9ehvm3q5lgidchk12lap0kp.apps.googleusercontent.com",
  //   androidClientId:
  //     "376583342053-d1kh9q0nr0d7it20ttiqq2hoevcmem6j.apps.googleusercontent.com",
  //   scopes: ["profile", "email"],
  //   redirectUri: AuthSession.makeRedirectUri({
  //     scheme: "clearsight",
  //   }),
  // });

  // const handleToken = () => {
  //   if (response?.type === "success") {
  //     const { authentication } = response;
  //     const token = authentication?.accessToken;
  //     console.log("accessToken", token);
  //   }
  // };

  // useEffect(() => {
  //   handleToken();
  // }, [response]);

  const inputChangeHandler = (inputIdentifier, enteredValue) => {
    setSigninData((prevState) => {
      return { ...prevState, [inputIdentifier]: enteredValue };
    });

    setSigninErrorMsg((prevErrors) => ({
      ...prevErrors,
      [inputIdentifier]: "",
    }));
  };

  const viewPasswordHandler = () => {
    setViewPassword((prevState) => !prevState);
  };

  const {
    isLoading,
    setPostResponse,
    postResponse,
    setErrorMsg,
    errorMsg,
    postData,
    clearPostResponse,
  } = usePost(postUri);

  const SubmitHandler = () => {
    setIsSigninLoading(true);
    const errors = validateSignInData(signinData);

    setSigninErrorMsg(errors);

    if (Object.values(errors).some((error) => error !== "")) {
      setIsSigninLoading(false);
      return;
    }

    postData(SIGN_IN_URL, signinData);
  };

  useEffect(() => {
    if (postResponse?.status === 200) {
      setIsSigninLoading(false);
      authenticate(postResponse.data);
      const timeOutId = setTimeout(() => {
        setPostResponse(null);
      }, 3000);

      return () => clearTimeout(timeOutId);
    }

    if (errorMsg) {
      setIsSigninLoading(false);
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
                  Sign Up or Login to your account
                </Text>
                <View style={styles.loginSignContainer}>
                  <Text
                    style={[
                      styles.loginSignText,
                      currentScreen === "Signin" &&
                        styles.loginSignTextBackgroundColor,
                    ]}
                  >
                    Login
                  </Text>
                  <Pressable onPress={() => navigation.navigate("Signup")}>
                    <Text style={styles.loginSignText}>Signup</Text>
                  </Pressable>
                </View>

                {postResponse?.data.message ? (
                  <View style={styles.successMsgContainer}>
                    <Ionicons
                      name="checkmark-done-circle"
                      size={34}
                      color={Colors.accent100}
                    />
                    <Text style={styles.successMsg}>
                      {postResponse.data.message}
                    </Text>
                  </View>
                ) : (
                  ""
                )}
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
                    label="Email"
                    TextInputConfig={{
                      autoCorrect: false,
                      placeholder: "Enter Email Address",
                      onChangeText: (text) => inputChangeHandler("email", text),
                      value: signinData.email,
                      keyboardType: "email-address",
                    }}
                    hasError={!!signinErrorMsg.email}
                  />
                  {signinErrorMsg.email ? (
                    <Text style={styles.errorMessage}>
                      {signinErrorMsg.email}
                    </Text>
                  ) : null}
                </View>

                <View>
                  <Input
                    label="password"
                    type="password"
                    icon="lock-closed-outline"
                    showPassword="eye-outline"
                    hidePassword="eye-off-outline"
                    onPress={viewPasswordHandler}
                    TextInputConfig={{
                      autoCorrect: false,
                      placeholder: "Enter password",
                      onChangeText: (text) =>
                        inputChangeHandler("password", text),
                      value: signinData.password,
                      secureTextEntry: !viewPassword,
                    }}
                    hasError={!!signinErrorMsg.password}
                  />
                  {signinErrorMsg.password ? (
                    <Text style={styles.errorMessage}>
                      {signinErrorMsg.password}
                    </Text>
                  ) : null}
                </View>
                <View style={styles.forgotPasswordContainer}>
                  <View style={styles.rememberMeContainer}>
                    <Checkbox
                      value={isChecked}
                      onValueChange={setIsChecked}
                      color={isChecked ? "#007bff" : undefined}
                    />
                    <Text style={styles.RememberMeText}>Remember me</Text>
                  </View>
                  <Pressable
                    onPress={() =>
                      navigation.navigate("ForgotPasswordEmailVerification")
                    }
                  >
                    <Text style={styles.forgotPasswordText}>
                      Forgot Password?
                    </Text>
                  </Pressable>
                </View>
              </View>

              <View style={styles.bottomSection}>
                <Button
                  label="Get Started"
                  onPress={SubmitHandler}
                  isLoading={isSigninLoading}
                />
                <View style={styles.loginOptionsContainer}>
                  <View style={styles.loginOptionView} />
                  <Text style={styles.loginOptionText}>Or login with</Text>
                  <View style={styles.loginOptionView} />
                </View>

                <Pressable
                  // disabled={!request}
                  // onPress={() => promptAsync()}
                  style={styles.icon}
                >
                  <Ionicons name="logo-google" size={35} color="red" />
                  <Text>Google</Text>
                </Pressable>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Signin;

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
    gap: 30,
  },
  text: {
    fontFamily: "Montserrat-Bold",
    color: "white",
    textAlign: "center",
    fontSize: 35,
  },
  loginSignContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 40,
    backgroundColor: Colors.primary500,
    padding: 5,
  },
  loginSignText: {
    fontFamily: "Montserrat-Regular",
    color: "white",
    textAlign: "center",
    fontSize: 25,
    borderRadius: 40,
    paddingHorizontal: 40,
    paddingVertical: 5,
  },
  loginSignTextBackgroundColor: {
    backgroundColor: Colors.primary600,
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
    paddingTop: 20,
  },
  errorMessage: {
    fontFamily: "Montserrat-Regular",
    color: "red",
    fontSize: 14,
    marginTop: 8,
  },
  errorMsgContainer: {
    alignItems: "center",
    gap: 10,
  },
  errorMsg: {
    fontFamily: "Montserrat-Regular",
    color: "red",
  },
  successMsgContainer: {
    alignItems: "center",
    gap: 10,
  },
  successMsg: {
    fontFamily: "Montserrat-Regular",
    color: Colors.accent100,
  },
});
