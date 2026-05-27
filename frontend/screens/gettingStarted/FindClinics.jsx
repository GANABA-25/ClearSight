import GettingStartedScreenLayout from "../../components/GettingStartedScreenLayout";
import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext } from "react";
import { AuthContext } from "../../store/AuthContext";

const FindClinics = () => {
  const { setIsGettingStartedComplete } = useContext(AuthContext);
  const gettingStartedCompleteHandler = async () => {
    await AsyncStorage.setItem("gettingStartedCompleted", "true");
    setIsGettingStartedComplete(true);
  };

  return (
    <LinearGradient
      colors={[Colors.primary100, Colors.primary400]}
      style={styles.outerContainer}
    >
      <GettingStartedScreenLayout
        title="Find nearby eye clinics easily"
        imageUri="https://res.cloudinary.com/dmdnq9vh8/image/upload/v1753263515/ClearSight/Onboarding_3_sj64hr.png"
        onNext={gettingStartedCompleteHandler}
      />
    </LinearGradient>
  );
};

export default FindClinics;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
});
