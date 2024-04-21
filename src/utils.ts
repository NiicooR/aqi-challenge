import { Forecast, FormattedForecast } from "./contexts/air-quality-context";

export const getDateWithOffset = (offset: number) => {
  const dateOffset = 24 * 60 * 60 * 1000 * offset;
  let d = new Date();
  d.setTime(d.getTime() + dateOffset);
  return d.toISOString().split("T")[0];
};

export const formatForecast = (forecast: Forecast): FormattedForecast => {
  const dates = [
    getDateWithOffset(-1),
    getDateWithOffset(0),
    getDateWithOffset(1),
  ];

  const formattedForecast: FormattedForecast = {};
  dates.forEach((date) => {
    Object.entries(forecast.daily).map(([key, daily]) => {
      const dayFound = daily.find((d) => d.day === date);
      if (dayFound) {
        if (formattedForecast[date]) {
          formattedForecast[date][key] = dayFound;
        } else {
          formattedForecast[date] = { [key]: dayFound };
        }
      }
    });
  });

  return formattedForecast;
};

export const minutesToMillis = (minutes: number) => {
  return 1000 * 60 * minutes;
};
