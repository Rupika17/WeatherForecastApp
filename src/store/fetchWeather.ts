import { createAsyncThunk } from "@reduxjs/toolkit";
import { ExtendedForecastData, LocationData, WeatherData } from "../api/types";
import { fetchExtendedForecastData, fetchWeatherData } from "../api/weather";
import { getNextSevenDays } from "../utils/dateUtils";
import { setIsInitial, setIsLoading } from "./reducers/appReducer";

export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async (
    city: string | { lat: number; lng: number },
    { dispatch, rejectWithValue, fulfillWithValue }
  ) => {
    dispatch(setIsLoading(true));

    try {
      const res = await Promise.all([
        fetchWeatherData(city),
        fetchExtendedForecastData(city),
      ]);
      dispatch(setIsLoading(false));
      console.log(res);
      if (res?.length > 0) {
        dispatch(setIsInitial(false));
        return res;
      }
      return rejectWithValue(res[0].message);
    } catch {
      dispatch(setIsLoading(false));
      return rejectWithValue("Error");
    }
  }
);

export const transformWeatherData = (
  res: any
): {
  weather: WeatherData;
  forecast: ExtendedForecastData[];
  location: LocationData;
} => {
  const weather = res[0].current as WeatherData;
  const forecast: ExtendedForecastData[] = [];
  const location = res[0].location as LocationData;
  weather.wind_kph = Math.round(weather.wind_kph * 3.6);

  const next7Days = getNextSevenDays();

  res[1].forecast.forecastday.forEach((i: any, index: number) => {
    forecast.push({
      day: next7Days[index],
      temp: {
        temp_max_c: i.day.maxtemp_c,
        temp_min_c: i.day.mintemp_c,
        temp_max_f: i.day.maxtemp_f,
        temp_min_f: i.day.mintemp_f,
      },
      weather: {
        id: i.day.condition.icon,
        main: i.day.condition.text,
      },
    });
  }, ...res[1].forecast.forecastday);

  return {
    weather,
    forecast,
    location,
  };
};
