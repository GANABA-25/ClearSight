import Constants from "expo-constants";
import { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";
import { useContext } from "react";
import { FindClinicsContext } from "../store/FindClinicsContext";
import { ActivityIndicator, View, Alert } from "react-native";

const Maps = () => {
  const { NearByClinics } = useContext(FindClinicsContext);
  const PLACES_API_KEY = Constants.expoConfig?.extra?.PLACES_API_KEY;
  const [location, setLocation] = useState(null);
  const [clinics, setClinics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClinics = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Permission Denied",
            "Location access is required to find nearby clinics."
          );
          setLoading(false);
          return;
        }

        const currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);
        const { latitude, longitude } = currentLocation.coords;

        const radius = 5000;
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/place/nearbysearch/json`,
          {
            params: {
              location: `${latitude},${longitude}`,
              radius,
              keyword: "eye clinic",
              key: PLACES_API_KEY,
            },
          }
        );

        const formattedClinics = response.data.results
          .slice(0, 3)
          .map((item) => ({
            name: item.name,
            lat: item.geometry.location.lat,
            lng: item.geometry.location.lng,
            vicinity: item.vicinity,
          }));

        setClinics(formattedClinics);
        NearByClinics(formattedClinics);
      } catch (error) {
        console.error("Error fetching clinics:", error);
        Alert.alert(
          "Error",
          "Unable to fetch nearby clinics. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchClinics();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#6C63FF" />
      </View>
    );
  }

  if (!location) return null;

  return (
    <MapView
      style={{ flex: 1 }}
      region={{
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}
      showsUserLocation
      showsMyLocationButton
    >
      {clinics.map((clinic, index) => (
        <Marker
          key={index}
          coordinate={{ latitude: clinic.lat, longitude: clinic.lng }}
          title={clinic.name}
          description={clinic.vicinity}
          pinColor="red"
        />
      ))}
    </MapView>
  );
};

export default Maps;
