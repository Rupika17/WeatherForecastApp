// Dialog.tsx
import React from "react";
import "./Dialog.css";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { useDispatch, useSelector } from "react-redux";
import { AppStore } from "../../store/store";
import DialogContent from "@mui/material/DialogContent";
import {
  CurrentWeatherContainer,
  CurrentWeatherInfo,
  CurrentWeatherStatusDialog,
  FeelsLike,
  HighLowContainer,
  ImgRow,
  InfoRow,
  WeatherDegree,
} from "../CurrentWeather/styled";
import { TempUnit } from "../../utils/unitConversion";
import Temperature from "../CurrentWeather/Temperature";
import { ReactComponent as HighIcon } from "../../assets/high-icon.svg";
import { ReactComponent as HumidityIcon } from "../../assets/humidity-icon.svg";
import { ReactComponent as LowIcon } from "../../assets/low-icon.svg";
import { ReactComponent as PressureIcon } from "../../assets/pressure-icon.svg";
import { ReactComponent as WindIcon } from "../../assets/wind-icon.svg";
import ToggleSwitch from "../ui/ToggleSwitch/ToggleSwitch";
import { changeTempUnit } from "../../store/reducers/appReducer";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FullScreenDialog: React.FC<DialogProps> = ({ isOpen, onClose }) => {
  const { weather, degreeType, forecast, location, isInitial } = useSelector(
    (store: AppStore) => ({
      weather: store.weather.weatherData,
      degreeType: store.app.tempUnit,
      forecast: store.weather.extendedWeatherData,
      location: store.weather.locationData,
      isInitial: store.app.isInitial,
    })
  );
  const dispatch = useDispatch();

  if (!isOpen) return null;

  function formatDate(input: string): string {
    const parts = input.split("-");
    if (parts.length !== 3) {
      throw new Error("Invalid input date format. Expected yyyy-mm-dd.");
    }

    const year = parts[0];
    const month = parts[1];
    const day = parts[2];

    return `${day}-${month}-${year}`;
  }

  if (isInitial) return <></>;
  return (
    <div>
      <Dialog open={isOpen} onClose={onClose} TransitionComponent={Transition}>
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Weather Details
            </Typography>

            <ToggleSwitch onClick={() => dispatch(changeTempUnit())} />

            <IconButton
              edge="start"
              color="inherit"
              onClick={onClose}
              aria-label="close"
              style={{ marginLeft: "20px" }}
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <CurrentWeatherContainer>
            <CurrentWeatherStatusDialog>
              <h4>
                {location.name},{location.country}
              </h4>
              <h6>{formatDate(weather?.last_updated?.split(" ")[0])}</h6>
              <div style={{ display: "flex" }}>
                <ImgRow src={weather.condition.icon} />
              </div>
              <div style={{ display: "flex" }}>
                <span>
                  {degreeType === TempUnit.CELCIUS ? (
                    <Temperature value={weather?.temp_c} />
                  ) : (
                    <Temperature value={weather?.temp_f} />
                  )}
                  <sup>&deg;</sup>
                </span>
              </div>
              <h6>{weather?.condition?.text}</h6>
            </CurrentWeatherStatusDialog>

            <CurrentWeatherInfo>
              <FeelsLike>
                Feels like <sup> </sup>
                {degreeType === TempUnit.CELCIUS ? (
                  <Temperature value={weather?.temp_c} />
                ) : (
                  <Temperature value={weather?.temp_f} />
                )}
                <sup>&deg;</sup>
              </FeelsLike>
              <HighLowContainer>
                <WeatherDegree>
                  <HighIcon />
                  {degreeType === TempUnit.CELCIUS ? (
                    <Temperature value={forecast[0]?.temp?.temp_max_c} />
                  ) : (
                    <Temperature value={forecast[0]?.temp?.temp_max_f} />
                  )}
                  <sup>&deg;</sup>
                </WeatherDegree>
                <WeatherDegree>
                  <LowIcon />
                  {degreeType === TempUnit.CELCIUS ? (
                    <Temperature value={forecast[0]?.temp?.temp_min_c} />
                  ) : (
                    <Temperature value={forecast[0]?.temp?.temp_min_f} />
                  )}
                  <sup>&deg;</sup>
                </WeatherDegree>
              </HighLowContainer>
              <InfoRow>
                <div>
                  <HumidityIcon /> Humidity
                </div>
                <span>{weather.humidity}%</span>
              </InfoRow>
              <InfoRow>
                <div>
                  <WindIcon /> Wind
                </div>
                <span>
                  {degreeType === TempUnit.CELCIUS
                    ? weather.wind_kph
                    : weather.wind_mph}
                  <sup> </sup>
                  {degreeType === TempUnit.CELCIUS ? "kph" : "mph"}
                  <sup> </sup>Towards {weather.wind_dir}
                </span>
              </InfoRow>
              <InfoRow>
                <div>
                  <PressureIcon /> Pressure
                </div>
                <span>
                  {weather.pressure_mb}
                  <sup> </sup>mb
                </span>
              </InfoRow>
            </CurrentWeatherInfo>
          </CurrentWeatherContainer>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FullScreenDialog;
