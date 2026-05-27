import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect, useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { useContext } from "react";
import { AuthContext } from "../store/AuthContext";
import { CataractDetectionContext } from "../store/CataractDetectionContext";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import Colors from "../constants/Colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";

import { usePost } from "../hooks/usePost";
import { postUri } from "../http";

const Camera = () => {
  const navigation = useNavigation();
  const SCAN_IMAGE_URL = Constants.expoConfig?.extra?.SCAN_IMAGE_URL;
  const { OnboardingToken, userData } = useContext(AuthContext);
  const { scanHistory } = useContext(CataractDetectionContext);
  const [image, setImage] = useState(null);
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const takePictureHandler = async () => {
    if (cameraRef.current) {
      try {
        const photoData = await cameraRef.current.takePictureAsync();
        setImage(photoData.uri);
      } catch (err) {
        console.error("Error taking picture:", err);
      }
    }
  };

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

  const { postResponse, errorMsg, postData } = usePost(postUri);

  const scanImageHandler = () => {
    const formData = new FormData();

    formData.append("image", {
      uri: image,
      type: "image/jpeg",
      name: "eye_scan.jpg",
    });
    formData.append("userId", userData.userId);

    postData(SCAN_IMAGE_URL, formData, {
      headers: {
        Authorization: `Bearer ${OnboardingToken}`,
        "Content-Type": "multipart/form-data",
      },
    });

    navigation.navigate("ScanEye", { photoUri: image });
  };

  useEffect(() => {
    if (postResponse?.data?.message) {
      scanHistory(postResponse.data);
      console.log(postResponse.data);
      navigation.navigate("ScanResult", {
        message: postResponse.data.message,
        percentage: postResponse.data.percentage,
        resultType: postResponse.data.resultType,
        tagName: postResponse.data.tagName,
        photoUri: image,
      });
    }

    if (errorMsg?.data?.message) {
      console.log("error came here ---", errorMsg);
    }
  }, [postResponse?.data?.message, errorMsg?.data?.message]);

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <TouchableOpacity
          onPress={requestPermission}
          style={styles.permissionBtn}
        >
          <Text style={styles.permissionText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (image) {
    return (
      <LinearGradient
        colors={["#2c7bc5ff", "#142331", "#1e4467ff"]}
        style={styles.previewContainer}
      >
        <View style={styles.imageWrapper}>
          <Image source={{ uri: image }} style={styles.previewImage} />
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={[styles.actionButton, styles.retakeButton]}
            onPress={() => setImage(null)}
          >
            <Ionicons name="camera-reverse" size={22} color="white" />
            <Text style={styles.buttonText}>Retake</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.scanButton]}
            onPress={scanImageHandler}
          >
            <Ionicons name="scan" size={22} color="white" />
            <Text style={styles.buttonText}>Proceed</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.closeButton]}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="close-circle" size={22} color="white" />
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={styles.camera} facing={facing} />

      <TouchableOpacity
        style={styles.closeCamera}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="close-circle" size={30} color="white" />
      </TouchableOpacity>

      <View style={styles.innerContainer}>
        <TouchableOpacity
          onPress={takePictureHandler}
          style={styles.takePictureButton}
        >
          <View style={styles.takePicture} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={toggleCameraFacing}
          style={styles.switchCamera}
        >
          <MaterialIcons name="cameraswitch" size={35} color="white" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={pickImage} style={styles.galleryButton}>
        <Ionicons name="image" size={35} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default Camera;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  message: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    paddingBottom: 10,
  },
  permissionBtn: {
    backgroundColor: Colors.primary300,
    padding: 12,
    borderRadius: 25,
    alignSelf: "center",
  },
  permissionText: {
    color: "white",
    fontFamily: "Montserrat-Bold",
  },
  camera: {
    flex: 1,
  },
  closeCamera: {
    position: "absolute",
    top: 50,
    right: 30,
    zIndex: 10,
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  takePictureButton: {
    alignItems: "center",
  },
  takePicture: {
    backgroundColor: "white",
    width: 75,
    height: 75,
    borderRadius: 38,
    borderWidth: 3,
    borderColor: "#2c7bc5ff",
  },
  switchCamera: {
    position: "absolute",
    right: 30,
    bottom: 35,
  },
  galleryButton: {
    position: "absolute",
    left: 30,
    bottom: 35,
  },
  previewContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingTop: 80,
  },
  previewImage: {
    width: "90%",
    height: "80%",
    borderRadius: 20,
    resizeMode: "cover",
    borderWidth: 3,
    borderColor: Colors.primary300,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    paddingVertical: 25,
    backgroundColor: "rgba(20, 35, 49, 0.95)",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 25,
  },
  retakeButton: {
    backgroundColor: "#FF8C00",
  },
  scanButton: {
    backgroundColor: Colors.primary300,
  },
  closeButton: {
    backgroundColor: "#e63946",
  },
  buttonText: {
    color: "white",
    fontFamily: "Montserrat-Bold",
    fontSize: 16,
  },
});
