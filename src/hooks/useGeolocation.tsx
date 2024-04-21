import { useEffect, useState } from "react";

type Location = {
  latitude: number;
  longitude: number;
};
export type GeolocationType = {
  location: Location | null;
  error: string | null;
  isLoading: boolean;
};
export const useGeolocation = (): GeolocationType => {
  const [location, setLocation] = useState<GeolocationType["location"]>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getUserLocation = () => {
    setError("");
    setIsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          setIsLoading(false);
        },
        (error) => {
          console.error("Error getting user location:", error);
          setError("Error getting user location");
          setIsLoading(false);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setIsLoading(true);
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  return { location, error, isLoading };
};
