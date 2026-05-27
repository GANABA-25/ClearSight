import { useState, useEffect, useContext } from "react";

import Constants from "expo-constants";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";
import Colors from "../../constants/Colors";

import { AuthContext } from "../../store/AuthContext";
import { usePost } from "../../hooks/usePost";
import { postUri } from "../../http";

import OnboardingScreenLayout from "../../components/OnboardingScreenLayout";

import loadingIcon from "../../assets/images/3-dots-scale.svg";
import loadingIcon2 from "../../assets/images/12-dots-scale.svg";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";

const DiabetesOrHypertensionInformation = () => {
  const ONBOARDING_URL = Constants.expoConfig?.extra?.ONBOARDING_URL;
  const { OnboardingComplete, userData } = useContext(AuthContext);
  const navigation = useNavigation();
  const route = useRoute();
  const glasses = route.params?.glasses;
  const eyeCondition = route.params?.eyeCondition;
  const familyEyeHistory = route.params?.familyEyeHistory;

  const [userHistory, setUserHistory] = useState({
    glasses: glasses,
    eyeCondition: eyeCondition,
    familyEyeHistory: familyEyeHistory,
    userId: userData?.userId,
    medicalCondition: "",
  });

  const {
    isLoading,
    setIsLoading,
    setPostResponse,
    postResponse,
    setErrorMsg,
    errorMsg,
    postData,
    clearPostResponse,
  } = usePost(postUri);

  const DiabetesButton = () => {
    const updatedHistory = {
      ...userHistory,
      medicalCondition: "diabetes",
    };
    setUserHistory(updatedHistory);
    postData(ONBOARDING_URL, updatedHistory);
  };

  const HypertensionButton = () => {
    const updatedHistory = {
      ...userHistory,
      medicalCondition: "hypertension",
    };
    setUserHistory(updatedHistory);
    postData(ONBOARDING_URL, updatedHistory);
  };

  const notSureSubmitHandler = () => {
    const updatedHistory = {
      ...userHistory,
      medicalCondition: "Not Sure",
    };
    setUserHistory(updatedHistory);
    postData(ONBOARDING_URL, updatedHistory);
  };

  useEffect(() => {
    if (postResponse) {
      OnboardingComplete(postResponse.data.onBoardingToken);
      const timerId = setTimeout(() => {
        clearPostResponse();
      }, 300);

      return () => clearTimeout(timerId);
    }

    if (errorMsg) {
      const timerId = setTimeout(() => {
        setErrorMsg(null);
      }, 300);
      return () => clearTimeout(timerId);
    }
  }, [postResponse, errorMsg]);

  return (
    <LinearGradient
      colors={[Colors.primary100, Colors.primary400]}
      style={styles.outerContainer}
    >
      <SafeAreaView style={styles.safeView}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Creating profile</Text>
            <View style={styles.loadingIcon}>
              <ActivityIndicator size="large" color="gray" />
            </View>
          </View>
        ) : (
          <>
            {postResponse?.data?.message ? (
              <View style={styles.loadingContainer}>
                <View style={styles.successMsgContainer}>
                  <Ionicons
                    name="checkmark-done-circle"
                    size={50}
                    color={Colors.accent100}
                  />
                  <Text style={styles.successMsg}>
                    {postResponse?.data?.message}
                  </Text>
                </View>
              </View>
            ) : errorMsg ? (
              <View style={styles.loadingContainer}>
                <View style={styles.errorMsgContainer}>
                  <MaterialIcons name="error-outline" size={50} color="red" />
                  <Text style={styles.errorMsg}>{errorMsg?.message}</Text>
                </View>
              </View>
            ) : (
              <OnboardingScreenLayout
                title="Whew!"
                question="Diabetes or Hypertension?"
                a
                buttonLabel="Diabetes"
                button_2Label="Hypertension"
                familyHistory="Yes"
                Absolute={DiabetesButton}
                No={HypertensionButton}
                notSure={notSureSubmitHandler}
              />
            )}
          </>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
};

export default DiabetesOrHypertensionInformation;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  safeView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
  },
  loadingText: {
    fontFamily: "Montserrat-Bold",
    textAlign: "center",
    fontSize: 30,
    color: "gray",
    paddingVertical: 20,
  },
  loadingIcon: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  successMsgContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  successMsg: {
    fontFamily: "Montserrat-Regular",
    color: Colors.accent100,
  },
  errorMsgContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  errorMsg: {
    fontFamily: "Montserrat-Regular",
    fontSize: 30,
    color: "red",
  },
});
