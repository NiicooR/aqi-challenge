import { createContext, useContext, useState } from "react";
import { GeolocationType, useGeolocation } from "../hooks/useGeolocation";
import {
  getAQIFeedByCity,
  getAQIFeedByCoordinates,
} from "../service/air-quality-service";
import { useQuery } from "@tanstack/react-query";
import { formatForecast, minutesToMillis } from "../utils";

export type FormattedForecast = Record<string, Record<string, DailyForecast>>;

export type RequestStatusType = {
  errorMessage: string;
  isLoading: boolean;
};
export type Forecast = {
  daily: Record<string, DailyForecast[]>;
};

type DailyForecast = {
  avg: number;
  day: string;
  max: number;
  min: number;
};

export type AirQualityDataType = {
  iaqi: Record<string, { v: number }>;
  forecast: FormattedForecast;
  dominentpol: string;
  city: string;
};

type ContextStoreType = {
  geolocation: GeolocationType | null;
  airQualityData: AirQualityDataType | null;
  searchValue: string;
  searchValueHandler: (v: string) => void;
  requestStatus: RequestStatusType;
};

const defaultContext: ContextStoreType = {
  geolocation: null,
  airQualityData: null,
  searchValue: "",
  searchValueHandler: () => null,
  requestStatus: { errorMessage: "", isLoading: false },
};

const AirQualityContext = createContext(defaultContext);

export function AirQualityProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchValue, setSearchValue] = useState("");
  const geolocation = useGeolocation();

  const {
    data: dataFromCity,
    error: errorFromCity,
    isLoading: isLoadingFromCity,
  } = useQuery({
    enabled: Boolean(searchValue),
    queryKey: ["AqiFeedByCity", searchValue],
    queryFn: async () => {
      if (searchValue) return getAQIFeedByCity(searchValue);
    },
    staleTime: minutesToMillis(10),
    retry: 1,
  });

  const {
    data: dataFromGeolocation,
    error: errorFromGeolocation,
    isLoading: isLoadingFromGeolocation,
  } = useQuery({
    enabled: Boolean(geolocation.location !== null),
    queryKey: ["AqiFeed", geolocation.location],
    queryFn: async () => {
      if (geolocation.location)
        return getAQIFeedByCoordinates({ ...geolocation.location });
    },
    staleTime: minutesToMillis(10),
    retry: 1,
  });

  let airQualityData: ContextStoreType["airQualityData"] | null = null;

  if (dataFromCity || dataFromGeolocation) {
    let currentData;
    if (!searchValue) currentData = dataFromGeolocation;
    else currentData = dataFromCity || dataFromGeolocation;

    airQualityData = {
      city: currentData["city"]["name"],
      iaqi: currentData["iaqi"],
      forecast: formatForecast(currentData["forecast"]),
      dominentpol: currentData["dominentpol"],
    };
  }

  const searchValueHandler = (value: string) => {
    setSearchValue(value);
  };

  const requestStatus: RequestStatusType = (() => {
    const isLoading = searchValue
      ? isLoadingFromCity
      : isLoadingFromGeolocation;
    const errorMessage =
      (searchValue ? errorFromCity?.message : errorFromGeolocation?.message) ||
      "";
    return { isLoading, errorMessage };
  })();

  return (
    <AirQualityContext.Provider
      value={{
        geolocation: geolocation,
        requestStatus,
        airQualityData,
        searchValue,
        searchValueHandler,
      }}
    >
      {children}
    </AirQualityContext.Provider>
  );
}

export const useAirQuality = () => {
  const context = useContext(AirQualityContext);
  if (context === undefined) {
    throw new Error("useAirQuality must be used within a AirQualityProvider");
  }

  return context;
};
