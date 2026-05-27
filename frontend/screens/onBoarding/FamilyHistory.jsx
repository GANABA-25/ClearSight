import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import Colors from "../../constants/Colors";

import OnboardingScreenLayout from "../../components/OnboardingScreenLayout";

const FamilyHistory = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const glasses = route.params?.glasses;
  const eyeCondition = route.params?.eyeCondition;

  const yesSubmitHandler = () => {
    navigation.navigate("DiabetesOrHypertensionInformation", {
      glasses,
      eyeCondition,
      familyEyeHistory: "Yes",
    });
  };

  const noSubmitHandler = () => {
    navigation.navigate("DiabetesOrHypertensionInformation", {
      glasses,
      eyeCondition,
      familyEyeHistory: "No",
    });
  };

  const notSureSubmitHandler = () => {
    navigation.navigate("DiabetesOrHypertensionInformation", {
      glasses,
      eyeCondition,
      familyEyeHistory: "Not sure",
    });
  };
  return (
    <LinearGradient
      colors={[Colors.primary100, Colors.primary400]}
      style={styles.outerContainer}
    >
      <SafeAreaView style={styles.safeView}>
        <OnboardingScreenLayout
          title="Almost there!"
          question="Family history of eye disease?"
          buttonLabel="Yes"
          button_2Label="No"
          familyHistory="Yes"
          Absolute={yesSubmitHandler}
          No={noSubmitHandler}
          notSure={notSureSubmitHandler}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default FamilyHistory;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  safeView: {
    flex: 1,
  },
});
