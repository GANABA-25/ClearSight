import { useEffect, useContext } from "react";
import { StyleSheet, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AppContextProvider from "./store/AppContextProvider";
import { AuthContext } from "./store/AuthContext";
import Colors from "./constants/Colors";

import DetectCataracts from "./screens/gettingStarted/DetectCataracts";
import FindClinics from "./screens/gettingStarted/FindClinics";
import LearnAboutCataracts from "./screens/gettingStarted/LearnAboutCataracts";

import GlassesInformation from "./screens/onBoarding/GlassesInformation";
import EyeHistory from "./screens/onBoarding/EyeHistory";
import FamilyHistory from "./screens/onBoarding/FamilyHistory";
import DiabetesOrHypertensionInformation from "./screens/onBoarding/DiabetesOrHypertensionInformation";

import Signin from "./screens/authentication/Signin";
import Signup from "./screens/authentication/Signup";
import ForgotPasswordEmailVerification from "./screens/authentication/ForgotPasswordEmailVerification";
import ForgotPasswordOtpVerification from "./screens/authentication/ForgotPasswordOtpVerification";
import NewPassword from "./screens/authentication/NewPassword";

import Home from "./screens/main/Home";
import FindNearByClinics from "./screens/main/findClinics/FindNearByClinics";
import LearnMore from "./screens/main/learnMore/LearnMore";
import Profile from "./screens/main/Profile";
import Camera from "./components/Camera";
import ScanEye from "./screens/main/scanEye/ScanEye";
import ScanResult from "./screens/main/scanEye/ScanResult";
import WhatIsCataract from "./screens/main/learnMore/WhatIsCataract";
import CauseOfCataract from "./screens/main/learnMore/CauseOfCataract";
import SymptomsOfCataract from "./screens/main/learnMore/SymptomsOfCataract";
import PreventionOfCataract from "./screens/main/learnMore/PreventionOfCataract";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

import Ionicons from "@expo/vector-icons/Ionicons";
import Foundation from "@expo/vector-icons/Foundation";

const GettingStartedStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="DetectCataracts" component={DetectCataracts} />
      <Stack.Screen
        name="LearnAboutCataracts"
        component={LearnAboutCataracts}
      />
      <Stack.Screen name="FindClinics" component={FindClinics} />
    </Stack.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "transparent" },
      }}
    >
      <Stack.Screen name="Signin" component={Signin} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen
        name="ForgotPasswordEmailVerification"
        component={ForgotPasswordEmailVerification}
      />
      <Stack.Screen
        name="ForgotPasswordOtpVerification"
        component={ForgotPasswordOtpVerification}
      />
      <Stack.Screen name="NewPassword" component={NewPassword} />
    </Stack.Navigator>
  );
};

const OnBoardingScreens = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "transparent" },
      }}
    >
      <Stack.Screen name="GlassesInformation" component={GlassesInformation} />
      <Stack.Screen name="EyeHistory" component={EyeHistory} />
      <Stack.Screen name="FamilyHistory" component={FamilyHistory} />
      <Stack.Screen
        name="DiabetesOrHypertensionInformation"
        component={DiabetesOrHypertensionInformation}
      />
    </Stack.Navigator>
  );
};

const AuthenticatedStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "transparent" },
      }}
    >
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="Camera" component={Camera} />
      <Stack.Screen name="ScanEye" component={ScanEye} />
      <Stack.Screen name="ScanResult" component={ScanResult} />
      <Stack.Screen name="WhatIsCataract" component={WhatIsCataract} />
      <Stack.Screen name="CauseOfCataract" component={CauseOfCataract} />
      <Stack.Screen name="SymptomsOfCataract" component={SymptomsOfCataract} />
      <Stack.Screen name="FindNearByClinics" component={FindNearByClinics} />
      <Stack.Screen
        name="PreventionOfCataract"
        component={PreventionOfCataract}
      />
    </Stack.Navigator>
  );
};

// const MainTabs = () => {
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         headerShown: false,
//         tabBarActiveTintColor: Colors.primary300,
//         tabBarInactiveTintColor: "gray",
//         tabBarStyle: styles.tabBar,
//         tabBarShowLabel: false,
//         tabBarButton: (props) => (
//           <TouchableWithoutFeedback {...props}>
//             <View
//               style={{
//                 flex: 1,
//                 justifyContent: "center",
//                 alignItems: "center",
//               }}
//             >
//               {props.children}
//             </View>
//           </TouchableWithoutFeedback>
//         ),
//       }}
//     >
//       <Tab.Screen
//         name="Home"
//         component={Home}
//         options={{
//           tabBarIcon: ({ color }) => (
//             <Ionicons name="home" size={30} color={color} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="LearnMore"
//         component={LearnMore}
//         options={{
//           tabBarIcon: ({ color }) => (
//             <Foundation name="clipboard-notes" size={30} color={color} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="FindNearByClinics"
//         component={FindNearByClinics}
//         options={{
//           tabBarIcon: ({ color }) => (
//             <Ionicons name="location-sharp" size={30} color={color} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Profile"
//         component={Profile}
//         options={{
//           tabBarIcon: ({ color }) => (
//             <Ionicons name="person-sharp" size={30} color={color} />
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// };

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary300,
        tabBarInactiveTintColor: "gray",
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        tabBarItemStyle: styles.tabBarItem,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={28} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="LearnMore"
        component={LearnMore}
        options={{
          tabBarIcon: ({ color }) => (
            <Foundation name="clipboard-notes" size={28} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="FindNearByClinics"
        component={FindNearByClinics}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="location-sharp" size={28} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-sharp" size={28} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const Navigation = () => {
  const { isAuthenticated, isOnboardingComplete, isGettingStartedComplete } =
    useContext(AuthContext);

  return (
    <NavigationContainer>
      {!isGettingStartedComplete ? (
        <GettingStartedStack />
      ) : !isAuthenticated ? (
        <AuthStack />
      ) : !isOnboardingComplete ? (
        <OnBoardingScreens />
      ) : (
        <AuthenticatedStack />
      )}
    </NavigationContainer>
  );
};

export default function App() {
  const [loaded, error] = useFonts({
    "Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-Bold": require("./assets/fonts/Montserrat-Bold.ttf"),
    "Montserrat-ExtraBold": require("./assets/fonts/Montserrat-ExtraBold.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <LinearGradient
      colors={[Colors.primary100, Colors.primary400]}
      style={styles.container}
    >
      <AppContextProvider>
        <StatusBar style="light" />
        <Navigation />
      </AppContextProvider>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    position: "absolute",
    backgroundColor: Colors.accent100,
    borderRadius: 25,
    marginBottom: Platform.OS === "ios" ? 10 : 5,
    marginHorizontal: 10,
    height: Platform.OS === "ios" ? 70 : 60,
    borderTopWidth: 0,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    paddingBottom: Platform.OS === "ios" ? 20 : 8,
    paddingTop: Platform.OS === "ios" ? 10 : 6,
  },
  tabBarItem: {
    justifyContent: "center",
    alignItems: "center",
  },
});
