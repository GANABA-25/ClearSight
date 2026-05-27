import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({
  userData: null,
  isAuthenticated: false,
  authenticate: (userData) => {},
  logout: () => {},
  isOnboardingComplete: false,
  OnboardingComplete: (OnboardingToken) => {},
  isGettingStartedComplete: false,
  setIsGettingStartedComplete: (value) => {},
});

const AuthContextProvider = ({ children }) => {
  const [authData, setAuthData] = useState();
  const [OnboardingToken, setOnboardingToken] = useState();
  const [isGettingStartedComplete, setIsGettingStartedComplete] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadStoredToken = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem("userData");
        const OnboardingToken = await AsyncStorage.getItem("OnboardingToken");
        const gettingStarted = await AsyncStorage.getItem(
          "gettingStartedCompleted",
        );
        if (storedUserData) {
          setAuthData(JSON.parse(storedUserData));
        }
        if (OnboardingToken) {
          setOnboardingToken(JSON.parse(OnboardingToken));
        }

        if (gettingStarted === "true") {
          setIsGettingStartedComplete(true);
        } else {
          setIsGettingStartedComplete(false);
        }
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    loadStoredToken();
  }, []);

  const authenticate = async (userData) => {
    try {
      await AsyncStorage.setItem("userData", JSON.stringify(userData));
      await AsyncStorage.setItem(
        "OnboardingToken",
        JSON.stringify(userData.onBoardingToken),
      );
      setAuthData(userData);
      setOnboardingToken(userData.onBoardingToken);
    } catch (error) {
      console.error("Error saving auth token", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("userData");
      await AsyncStorage.removeItem("OnboardingToken");
      setAuthData(null);
    } catch (error) {
      console.error("Error removing auth token", error);
    }
  };

  const OnboardingComplete = async (OnboardingToken) => {
    await AsyncStorage.setItem(
      "OnboardingToken",
      JSON.stringify(OnboardingToken),
    );
    setOnboardingToken(OnboardingToken);
  };

  const value = {
    userData: authData,
    OnboardingToken,
    isAuthenticated: !!authData?.token,
    authenticate,
    logout,
    isOnboardingComplete: !!OnboardingToken,
    OnboardingComplete: OnboardingComplete,
    isGettingStartedComplete,
    setIsGettingStartedComplete,
  };

  if (isLoading) return null;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
