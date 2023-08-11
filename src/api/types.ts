export type WeatherData = {
  weather: {
    air_quality: {
      co: number;
      gb_defra_index: number;
      no2: number;
      o3: number;
      pm2_5: number;
      pm10: number;
      so2: number;
      us_epa_index: number;
    };
  };
  condition: {
    code: number;
    icon: string;
    text: string;
  };
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  gust_kph: number;
  gust_mph: number;
  humidity: number;
  is_day: number;
  last_updated:string;
  last_updated_epoch: number;
  precip_in: number;
  precip_mm: number;
  pressure_in: number;
  pressure_mb: number;
  temp_c: number;
  temp_f: number;
  uv: number;
  vis_km: number;
  vis_miles: number;
  wind_degree: number;
  wind_dir:string;
  wind_kph: number;
  wind_mph: number;
};
  
  export type ExtendedForecastData = {
    day: string;
    temp: {
      temp_min_c: number;
      temp_max_c: number;
      temp_min_f: number;
      temp_max_f: number;
    };
    weather: {
      id: string;
      main: string;
    };
  }
  export type LocationData = {
    country: string;
    name: string;
    region: string;
    tz_id: string;
  };