import { createSlice } from '@reduxjs/toolkit';
import { ExtendedForecastData, LocationData, WeatherData } from '../../api/types';
import { fetchWeather, transformWeatherData } from '../fetchWeather';

export type WeatherState = {
  weatherData: WeatherData;
  extendedWeatherData: ExtendedForecastData[];
  locationData: LocationData;
  isError: boolean;
}

const initialState: WeatherState = {
  weatherData: {
    weather: {
      air_quality: {
        co: 0,
        gb_defra_index: 0,
        no2: 0,
        o3: 0,
        pm2_5: 0,
        pm10: 0,
        so2: 0,
        us_epa_index: 0,
      },
    },
    condition: {
      code: 0,
      icon: '',
      text: '',
    },
    cloud: 0,
    feelslike_c: 0,
    feelslike_f: 0,
    gust_kph: 0,
    gust_mph: 0,
    humidity: 0,
    is_day: 0,
    last_updated:'',
    last_updated_epoch: 0,
    precip_in: 0,
    precip_mm: 0,
    pressure_in: 0,
    pressure_mb: 0,
    temp_c: 0,
    temp_f: 0,
    uv: 0,
    vis_km: 0,
    vis_miles: 0,
    wind_degree: 0,
    wind_dir:'',
    wind_kph: 0,
    wind_mph: 0,
  },
  extendedWeatherData: [],
  locationData : {
    country: "",
    name: "",
    region: "",
    tz_id: "",
  },
  isError: false,
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.fulfilled, (state, action) => {
        const res = transformWeatherData(action.payload);
        state.weatherData = res.weather;
        state.extendedWeatherData = res.forecast;
        state.locationData = res.location;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.isError = true;
      });
  },
});

export default weatherSlice.reducer;
