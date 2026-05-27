import { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../../store/AuthContext";
import { CataractDetectionContext } from "../../store/CataractDetectionContext";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../../constants/Colors";
import UserLocation from "../../components/UserLocation";
import { format } from "date-fns";

import Button from "../../components/Button";
import ActionCard from "../../components/ActionCard";

const Home = () => {
  const { logout, userData } = useContext(AuthContext);
  const { fetchDataIsLoading, scanHistoryData } = useContext(
    CataractDetectionContext,
  );
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={[Colors.primary100, Colors.primary400]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeView}>
        <View style={styles.headerContainer}>
          <Image source={require("../../assets/images/Menu.png")} />
          <Text style={styles.headerText}>Hi {userData.user}</Text>
          <Pressable
            onPress={logout}
            style={({ pressed }) => [
              styles.logoutButton,
              pressed && styles.logoutButtonPressed,
            ]}
          >
            <Text style={styles.logoutButtonText}>Logout</Text>
          </Pressable>
        </View>

        <View style={styles.actionCard}>
          <ActionCard onScanEye={() => setShowCamera(true)} />
        </View>

        <View style={styles.scanHistoryContainer}>
          <Text style={styles.scanHistoryText}>Scan History</Text>

          {fetchDataIsLoading ? (
            <Text>Loading......</Text>
          ) : (
            <FlatList
              data={scanHistoryData}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.scanHistory}>
                  <Text style={styles.scanMessage}>{item.message}</Text>
                  <Text style={styles.scanPercentage}>{item.percentage}</Text>
                  <Text style={styles.scanDate}>
                    {format(new Date(item.date), "PPpp")}
                  </Text>
                </View>
              )}
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>
                    No scan history yet. Perform a scan to get started 👁️
                  </Text>
                </View>
              }
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Home;

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
  headerText: {
    fontFamily: "Montserrat-ExtraBold",
    fontSize: 20,
    color: Colors.accent100,
  },
  logoutButton: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: Colors.accent100,
    padding: 5,
    paddingHorizontal: 10,
  },

  logoutButtonText: {
    color: Colors.accent100,
  },
  logoutButtonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  actionCard: {
    marginTop: 50,
  },
  scanHistoryContainer: {
    marginTop: 20,
  },
  scanHistoryText: {
    fontFamily: "Montserrat-Bold",
    color: "white",
    fontSize: 20,
  },
  scanHistory: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
  },

  scanMessage: {
    fontFamily: "Montserrat-Bold",
    color: "#fff",
    fontSize: 12,
    flex: 1,
  },
  scanPercentage: {
    fontFamily: "Montserrat-SemiBold",
    color: Colors.accent100,
    fontSize: 12,
    marginHorizontal: 12,
  },
  scanDate: {
    fontFamily: "Montserrat-Regular",
    color: "rgba(255,255,255,0.7)",
    fontSize: 12,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    padding: 20,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 12,
  },
  emptyText: {
    fontFamily: "Montserrat-Regular",
    color: "rgba(255,255,255,0.7)",
    fontSize: 14,
    textAlign: "center",
  },
});
