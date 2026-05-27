import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import GettingStartedScreenLayout from "../../components/GettingStartedScreenLayout";

const LearnAboutCataracts = () => {
  const navigation = useNavigation();
  return (
    <LinearGradient
      colors={[Colors.primary100, Colors.primary400]}
      style={styles.outerContainer}
    >
      <GettingStartedScreenLayout
        title="Learn about cataracts and preventions"
        imageUri="https://res.cloudinary.com/dmdnq9vh8/image/upload/v1753263513/ClearSight/Onboarding_2_cncx3d.png"
        onNext={() => navigation.navigate("FindClinics")}
      />
    </LinearGradient>
  );
};

export default LearnAboutCataracts;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
});
