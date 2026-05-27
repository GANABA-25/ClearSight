import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import GettingStartedScreenLayout from "../../components/GettingStartedScreenLayout";

const DetectCataracts = () => {
  const navigation = useNavigation();
  return (
    <LinearGradient
      colors={[Colors.primary100, Colors.primary400]}
      style={styles.outerContainer}
    >
      <GettingStartedScreenLayout
        title="Detect Cataracts early with your phone"
        imageUri="https://res.cloudinary.com/dmdnq9vh8/image/upload/v1753263514/ClearSight/Onboarding_1_j7pnii.png"
        onNext={() => navigation.navigate("LearnAboutCataracts")}
      />
    </LinearGradient>
  );
};

export default DetectCataracts;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
});
