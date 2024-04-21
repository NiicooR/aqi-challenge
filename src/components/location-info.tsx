import {
  AirQualityDataType,
  useAirQuality,
} from "../contexts/air-quality-context";
import { GeolocationType } from "../hooks/useGeolocation";
import "./location-info.css";

export const LocationInfo = () => {
  const { geolocation, airQualityData } = useAirQuality();

  const getLocationLabel = (geolocation: GeolocationType | null) => {
    const { location, isLoading, error } = geolocation || {};
    if (isLoading) return "Loading location...";
    if (error) return "Error getting location";
    const { latitude, longitude } = location || {};
    return latitude && longitude ? `${latitude} lat, ${longitude} long` : "";
  };

  const getCityLabel = (
    airQualityData: AirQualityDataType | null,
    geolocation: GeolocationType | null
  ) => {
    const { city } = airQualityData || { city: "" };
    if (city) return city;
    if (geolocation?.error) return "Error getting city";
    return "Loading city...";
  };

  const cityLabel = getCityLabel(airQualityData, geolocation);
  const locationLabel = getLocationLabel(geolocation);
  return (
    <section className="location-section">
      <p className="location-label">
        <span className="location-span">{`City: `}</span>
        {cityLabel}
      </p>
      <p className="location-label">
        <span className="location-span">{`User location: `}</span>
        {locationLabel}
      </p>
    </section>
  );
};
