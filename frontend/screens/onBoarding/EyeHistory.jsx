import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import Colors from "../../constants/Colors";
import OnboardingScreenLayout from "../../components/OnboardingScreenLayout";
import { useState } from "react";

const EyeHistory = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const glasses = route.params?.glasses;
  const [eyeCondition, setEyeCondition] = useState(null);

  const cataractButton = () => {
    setEyeCondition("cataract");
  };
  const noneButton = () => {
    setEyeCondition("none");
  };
  const otherButton = () => {
    setEyeCondition("other");
  };

  const nextHandler = () => {
    if (!eyeCondition) {
      alert("Please select an eye condition before continuing");
      return;
    }
    navigation.navigate("FamilyHistory", {
      glasses,
      eyeCondition,
    });
  };

  const goBack = () => {
    navigation.navigate("GlassesInformation");
  };

  return (
    <LinearGradient
      colors={[Colors.primary100, Colors.primary400]}
      style={styles.outerContainer}
    >
      <SafeAreaView style={styles.safeView}>
        <OnboardingScreenLayout
          title="Let's get to know you more"
          question="Any history of eye Condition?"
          buttonLabel="Next"
          button_2Label="Go back"
          eyeHistory="yes"
          Absolute={nextHandler}
          No={goBack}
          cataractButton={cataractButton}
          noneButton={noneButton}
          otherButton={otherButton}
          selectedEyeCondition={eyeCondition}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default EyeHistory;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  safeView: {
    flex: 1,
  },
});
