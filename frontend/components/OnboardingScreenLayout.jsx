import { Text, View, StyleSheet, Pressable } from "react-native";
import Button from "./Button";
import Button_2 from "./Button_2";
import OnboardingProgress from "./OnboardingProgress";

import Colors from "../constants/Colors";

const OnboardingScreenLayout = ({
  title,
  question,
  Absolute,
  No,
  buttonLabel,
  button_2Label,
  eyeHistory,
  cataractButton,
  noneButton,
  otherButton,
  selectedEyeCondition,
  familyHistory,
  notSure,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>{title}</Text>
        <OnboardingProgress />
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{question}</Text>
      </View>

      {eyeHistory && (
        <View style={styles.eyeHistoryContainer}>
          <Pressable
            style={[
              styles.eyeButton2,
              selectedEyeCondition === "cataract" && styles.selectedButton,
            ]}
            onPress={cataractButton}
          >
            <Text style={styles.eyeButtonText}>Cataract</Text>
          </Pressable>
          <View style={styles.eyeHistoryInnerContainer}>
            <Pressable
              style={[
                styles.eyeButton,
                selectedEyeCondition === "none" && styles.selectedButton,
              ]}
              onPress={noneButton}
            >
              <Text style={styles.eyeButtonText}>None</Text>
            </Pressable>
            <Pressable
              style={[
                styles.eyeButton,
                selectedEyeCondition === "other" && styles.selectedButton,
              ]}
              onPress={otherButton}
            >
              <Text style={styles.eyeButtonText}>Other</Text>
            </Pressable>
          </View>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <Button label={buttonLabel} onPress={Absolute} />
        <Button_2 label={button_2Label} onPress={No} />
        {familyHistory && (
          <Pressable onPress={notSure}>
            <Text style={styles.eyeButtonText}>Not sure</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default OnboardingScreenLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 70,
    justifyContent: "space-between",
  },
  content: {
    alignItems: "center",
  },
  text: {
    fontFamily: "Montserrat-Regular",
    color: "gray",
    textAlign: "center",
    fontSize: 34,
    marginBottom: 20,
  },
  questionContainer: {
    paddingHorizontal: 10,
  },
  questionText: {
    fontFamily: "Montserrat-ExtraBold",
    textAlign: "center",
    fontSize: 32,
    color: Colors.accent100,
  },
  eyeHistoryContainer: {
    alignItems: "center",
    gap: 20,
  },
  selectedButton: {
    backgroundColor: "gray",
    borderColor: "gray",
  },
  eyeButton: {
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 24,
    minWidth: 80,
  },
  eyeButton2: {
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 24,
    minWidth: 110,
    alignItems: "center",
  },
  eyeButtonText: {
    fontFamily: "Montserrat-Regular",
    fontSize: 20,
    color: "white",
    textAlign: "center",
  },
  eyeHistoryInnerContainer: {
    flexDirection: "row",
    gap: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    position: "relative",
    alignItems: "center",
  },
  buttonContainer: {
    gap: 20,
  },
});
