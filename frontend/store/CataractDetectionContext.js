import Constants from "expo-constants";
import { createContext, useState, useContext, useEffect } from "react";
import { usePost } from "../hooks/usePost";
import { useFetch } from "../hooks/useFetch";
import { postUri } from "../http";
import { getUri } from "../http";
import { AuthContext } from "./AuthContext";

export const CataractDetectionContext = createContext({
  scanHistoryData: [],
  scanHistory: (scanEyeResults) => {},
});

const CataractDetectionContextProvider = ({ children }) => {
  const [scanHistoryData, setScanHistoryData] = useState([]);
  const { OnboardingToken, userData, isAuthenticated } =
    useContext(AuthContext);
  const SCAN_HISTORY_URL = Constants.expoConfig?.extra?.SCAN_HISTORY_URL;
  const GET_SCAN_HISTORY_URL =
    Constants.expoConfig?.extra?.GET_SCAN_HISTORY_URL;

  const { errorMsg, postData } = usePost(postUri);

  const {
    isLoading: fetchDataIsLoading,
    fetchedData,
    errorMsg: fetchingErrorMsg,
    fetchData,
  } = useFetch(getUri);

  useEffect(() => {
    if (
      isAuthenticated &&
      userData?.userId &&
      userData?.token &&
      GET_SCAN_HISTORY_URL
    ) {
      fetchData(`${GET_SCAN_HISTORY_URL}?userId=${userData.userId}`, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      });
    }
  }, [isAuthenticated, userData, GET_SCAN_HISTORY_URL]);

  useEffect(() => {
    if (fetchedData) {
      setScanHistoryData(
        Array.isArray(fetchedData.data) ? fetchedData.data : [],
      );
    }

    if (fetchingErrorMsg) {
      console.log("error fetching ---", fetchingErrorMsg);
    }
  }, [fetchedData, fetchingErrorMsg]);

  const scanHistory = (scanEyeResults) => {
    setScanHistoryData((prev) => [...prev, scanEyeResults]);

    postData(
      SCAN_HISTORY_URL,
      { scanEyeResults, userId: userData.userId },
      {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      },
    );
  };

  useEffect(() => {
    if (errorMsg) {
      console.log("error posting ---", errorMsg);
    }
  }, [errorMsg]);

  const value = {
    scanHistoryData,
    scanHistory,
    fetchDataIsLoading,
  };

  return (
    <CataractDetectionContext.Provider value={value}>
      {children}
    </CataractDetectionContext.Provider>
  );
};

export default CataractDetectionContextProvider;
