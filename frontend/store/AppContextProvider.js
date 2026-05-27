import AuthContextProvider from "./AuthContext";
import CataractDetectionContextProvider from "./CataractDetectionContext";
import FindClinicsContextProvider from "./FindClinicsContext";

const AppContextProvider = ({ children }) => {
  return (
    <AuthContextProvider>
      <CataractDetectionContextProvider>
        <FindClinicsContextProvider>{children}</FindClinicsContextProvider>
      </CataractDetectionContextProvider>
    </AuthContextProvider>
  );
};

export default AppContextProvider;
