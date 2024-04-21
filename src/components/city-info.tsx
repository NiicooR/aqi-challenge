import { useAirQuality } from "../contexts/air-quality-context";
import { AirQualityCard } from "./air-quality-card";
import "./city-info.css";
import { LocationInfo } from "./location-info";

export const CityInfo = () => {
  const { airQualityData } = useAirQuality();

  return (
    <main>
      <LocationInfo />
      {!airQualityData ? (
        <section className="landing-section">
          <h1 className="landing-text">
            Enable your location or search by city
          </h1>
        </section>
      ) : (
        <AirQualityCard data={airQualityData} />
      )}
    </main>
  );
};
