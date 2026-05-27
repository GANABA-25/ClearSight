import Constants from "expo-constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import { useContext } from "react";
import { AuthContext } from "../../store/AuthContext";

import { validateUpdateProfileData } from "../../util/validation";
import { usePost } from "../../hooks/usePost";
import { postUri } from "../../http";
import Colors from "../../constants/Colors";
import Button from "../../components/Button";
import Input from "../../components/Input";

import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const Profile = () => {
  const { userData } = useContext(AuthContext);
  const navigation = useNavigation();
  const [upDateProfileErrorMsg, setUpDateProfileErrorMsg] = useState({});
  const UPDATE_PROFILE_URL = Constants.expoConfig?.extra?.UPDATE_PROFILE_URL;
  const [image, setImage] = useState(null);
  const [upDateProfile, setUpDateProfile] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    userId: userData?.userId,
  });

  const inputChangeHandler = (inputIdentifier, enteredValue) => {
    setUpDateProfile((prevState) => {
      return { ...prevState, [inputIdentifier]: enteredValue };
    });

    setUpDateProfileErrorMsg((prevErrors) => ({
      ...prevErrors,
      [inputIdentifier]: "",
    }));
  };

  const { isLoading, postResponse, errorMsg, postData, clearPostResponse } =
    usePost(postUri);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const updateProfileHandler = () => {
    const errors = validateUpdateProfileData(upDateProfile);

    setUpDateProfileErrorMsg(errors);

    if (Object.values(errors).some((error) => error !== "")) {
      return;
    }

    const formData = new FormData();

    if (image) {
      formData.append("image", {
        uri: image,
        type: "image/jpeg",
        name: "profile.jpg",
      });
    }

    formData.append("fullName", upDateProfile.fullName);
    formData.append("email", upDateProfile.email);
    formData.append("phoneNumber", upDateProfile.phoneNumber);
    formData.append("userId", upDateProfile.userId);

    postData(UPDATE_PROFILE_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    setUpDateProfile({
      fullName: "",
      email: "",
      phoneNumber: "",
    });
  };

  useEffect(() => {
    if (postResponse?.status === 200) {
      const timeOutId = setTimeout(() => {
        clearPostResponse();
      }, 3000);

      return () => clearTimeout(timeOutId);
    }
  }, [postResponse, errorMsg]);

  return (
    <LinearGradient
      colors={[Colors.primary100, Colors.primary400]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeView}>
        <View style={styles.headerContainer}>
          <Pressable onPress={() => navigation.goBack()} style={styles.icon}>
            <Ionicons name="arrow-back" size={30} color="white" />
          </Pressable>
        </View>
        <View style={styles.headerInnerContainer}>
          <Text style={styles.text}>Profile</Text>
          <Image
            style={styles.image}
            source={{
              uri: image ? image : userData.profilePicture,
            }}
          />
          <Pressable onPress={pickImage}>
            <Text style={styles.EditText}>Edit</Text>
          </Pressable>
        </View>

        <View style={styles.innerContainer}>
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
                onChangeText: (text) => inputChangeHandler("fullName", text),
                value: upDateProfile.fullName,
              }}
              hasError={!!upDateProfileErrorMsg.fullName}
            />
            {upDateProfileErrorMsg.fullName ? (
              <Text style={styles.errorMessage}>
                {upDateProfileErrorMsg.fullName}
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
                value: upDateProfile.email,
                keyboardType: "email-address",
              }}
              hasError={!!upDateProfileErrorMsg.email}
            />
            {upDateProfileErrorMsg.email ? (
              <Text style={styles.errorMessage}>
                {upDateProfileErrorMsg.email}
              </Text>
            ) : null}
          </View>
          <View>
            <Input
              label="PhoneNumber"
              type="number"
              TextInputConfig={{
                autoCorrect: false,
                placeholder: "Enter Phone Number",
                onChangeText: (text) => inputChangeHandler("phoneNumber", text),
                value: upDateProfile.phoneNumber,
                keyboardType: "phone-pad",
              }}
              hasError={!!upDateProfileErrorMsg.phoneNumber}
            />
            {upDateProfileErrorMsg.phoneNumber ? (
              <Text style={styles.errorMessage}>
                {upDateProfileErrorMsg.phoneNumber}
              </Text>
            ) : null}
          </View>
          <Button
            label="Update"
            onPress={updateProfileHandler}
            isLoading={isLoading}
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  safeView: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  icon: {
    borderColor: Colors.accent100,
    borderWidth: 1,
    width: 50,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  headerInnerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "Montserrat-Bold",
    fontSize: 30,
    color: Colors.accent100,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  EditText: {
    color: Colors.accent100,
    fontFamily: "Montserrat-Regular",
    fontSize: 20,
    marginTop: 10,
  },
  innerContainer: {
    flexDirection: "column",
    gap: 20,
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
