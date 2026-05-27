// store/FindClinicsContext.js
import { createContext, useState } from "react";

export const FindClinicsContext = createContext({
  clinic: [],
  NearByClinics: () => {},
});

const FindClinicsContextProvider = ({ children }) => {
  const [clinic, setClinic] = useState([]);

  const NearByClinics = (data) => {
    setClinic(data);
  };

  const value = {
    clinic,
    NearByClinics,
  };

  return (
    <FindClinicsContext.Provider value={value}>
      {children}
    </FindClinicsContext.Provider>
  );
};

export default FindClinicsContextProvider;
