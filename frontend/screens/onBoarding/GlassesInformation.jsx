import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import OnboardingScreenLayout from "../../components/OnboardingScreenLayout";
import Colors from "../../constants/Colors";

const GlassesInformation = () => {
  const navigation = useNavigation();

  const yesSubmitHandler = () => {
    navigation.navigate("EyeHistory", {
      glasses: "Yes",
    });
  };

  const noSubmitHandler = () => {
    navigation.navigate("EyeHistory", {
      glasses: "No",
    });
  };

  return (
    <LinearGradient
      colors={[Colors.primary100, Colors.primary400]}
      style={styles.outerContainer}
    >
      <SafeAreaView style={styles.safeView}>
        <OnboardingScreenLayout
          title="Let's get to know you more"
          question="Do you wear glasses or contacts?"
          buttonLabel="Yes"
          button_2Label="No"
          Absolute={yesSubmitHandler}
          No={noSubmitHandler}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default GlassesInformation;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  safeView: {
    flex: 1,
  },
});
