import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import Colors from "../../../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const WhatIsCataract = () => {
  const navigation = useNavigation();
  return (
    <LinearGradient
      colors={[Colors.primary100, Colors.primary400]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeView}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Pressable onPress={() => navigation.goBack()} style={styles.icon}>
              <Ionicons name="arrow-back" size={30} color="white" />
            </Pressable>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
              <Entypo name="eye" size={34} color="white" />
              <Text style={styles.headerText}>What is Cataract?</Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardText}>
                A cataract is a clouding of the eye’s natural lens (the clear
                structure behind the iris that helps focus light). This clouding
                leads to blurry vision, glare, and difficulty seeing clearly —
                as if looking through a foggy window.
              </Text>
            </View>

            <View style={styles.card}>
              <View style={styles.sectionHeader}>
                <MaterialIcons name="category" size={22} color="white" />
                <Text style={styles.sectionTitle}>Types of Cataracts</Text>
              </View>
              <View style={styles.list}>
                <View style={styles.listItem}>
                  <FontAwesome5 name="dot-circle" size={14} color="white" />
                  <Text style={styles.listText}>
                    Nuclear cataract – affects the center of the lens; common
                    with aging
                  </Text>
                </View>
                <View style={styles.listItem}>
                  <FontAwesome5 name="dot-circle" size={14} color="white" />
                  <Text style={styles.listText}>
                    Cortical cataract – affects the edges of the lens;
                    wedge-shaped opacities
                  </Text>
                </View>
                <View style={styles.listItem}>
                  <FontAwesome5 name="dot-circle" size={14} color="white" />
                  <Text style={styles.listText}>
                    Posterior subcapsular cataract – affects the back of the
                    lens; progresses faster
                  </Text>
                </View>
                <View style={styles.listItem}>
                  <FontAwesome5 name="dot-circle" size={14} color="white" />
                  <Text style={styles.listText}>
                    Congenital cataract – present at birth or early childhood
                  </Text>
                </View>
                <View style={styles.listItem}>
                  <FontAwesome5 name="dot-circle" size={14} color="white" />
                  <Text style={styles.listText}>
                    Traumatic cataract – caused by injury
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.card}>
              <View style={styles.sectionHeader}>
                <Ionicons name="information-circle" size={22} color="white" />
                <Text style={styles.sectionTitle}>Quick Facts</Text>
              </View>
              <View style={styles.list}>
                <View style={styles.listItem}>
                  <FontAwesome5 name="check-circle" size={14} color="white" />
                  <Text style={styles.listText}>
                    Cataract is the leading cause of blindness worldwide (but
                    treatable)
                  </Text>
                </View>
                <View style={styles.listItem}>
                  <FontAwesome5 name="check-circle" size={14} color="white" />
                  <Text style={styles.listText}>
                    Surgery success rate is &gt; 95% in restoring vision
                  </Text>
                </View>
                <View style={styles.listItem}>
                  <FontAwesome5 name="check-circle" size={14} color="white" />
                  <Text style={styles.listText}>
                    Usually develops slowly, but posterior subcapsular cataracts
                    can progress rapidly
                  </Text>
                </View>
                <View style={styles.listItem}>
                  <FontAwesome5 name="check-circle" size={14} color="white" />
                  <Text style={styles.listText}>
                    Both eyes can develop cataracts, but not always at the same
                    rate
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default WhatIsCataract;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  safeView: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 20,
  },
  icon: {
    borderColor: "white",
    borderWidth: 1,
    width: 50,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  headerText: {
    fontFamily: "Montserrat-ExtraBold",
    fontSize: 28,
    color: "white",
    marginLeft: 10,
  },
  card: {
    marginBottom: 16,
  },
  cardText: {
    color: "white",
    fontSize: 16,
    lineHeight: 24,
    fontFamily: "Montserrat-Regular",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Montserrat-Bold",
    color: "white",
    marginLeft: 8,
  },
  list: {
    marginTop: 6,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  listText: {
    fontSize: 15,
    color: "white",
    marginLeft: 8,
    lineHeight: 22,
    fontFamily: "Montserrat-Regular",
    flex: 1,
  },
});
