import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as HumidityIcon } from "../../assets/humidity-icon.svg";
import { AppStore } from "../../store/store";
import { changeTempUnit } from "../../store/reducers/appReducer";
import { TempUnit } from "../../utils/unitConversion";
import ToggleSwitch from "../ui/ToggleSwitch/ToggleSwitch";
import {
  CurrentWeatherStatus,
  CurrentWeatherContainer,
  InfoRow,
  SectionTitle,
  WeatherContainer,
  ImgRow,
} from "./styled";
import Temperature from "./Temperature";
import { Button } from "@mui/material";
import FullScreenDialog from "../FullScreenDialog/Dialog";

const CurrentWeather: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { weather, degreeType, isInitial, isError, location } = useSelector(
    (store: AppStore) => ({
      weather: store.weather.weatherData,
      degreeType: store.app.tempUnit,
      isInitial: store.app.isInitial,
      isError: store.weather.isError,
      location: store.weather.locationData,
    })
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      console.log("Cannot load weather for this place");
    }
  }, [isError]);

  function formatDate(input: string): string {
    const parts = input.split("-");
    if (parts?.length !== 3) {
      throw new Error("Invalid input date format. Expected yyyy-mm-dd.");
    }

    const year = parts[0];
    const month = parts[1];
    const day = parts[2];

    return `${day}-${month}-${year}`;
  }

  if (isInitial) return <></>;

  return (
    <WeatherContainer>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <SectionTitle>Current Weather</SectionTitle>
        <div>
          <ToggleSwitch onClick={() => dispatch(changeTempUnit())} />
        </div>
      </div>

      <CurrentWeatherContainer>
        <CurrentWeatherStatus>
          <h4>
            {location.name},{location.country}
          </h4>
          <h6>
            {weather?.last_updated
              ? formatDate(weather?.last_updated?.split(" ")[0])
              : 0}
          </h6>
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
          <br />
          <InfoRow>
            <div>
              <HumidityIcon /> Humidity
            </div>
            <span>{weather.humidity}%</span>
          </InfoRow>
        </CurrentWeatherStatus>
      </CurrentWeatherContainer>
      <Button variant="outlined" onClick={handleClickOpen}>
        Click to see details !
      </Button>
      <FullScreenDialog
        isOpen={open}
        onClose={handleClose}
        title="Full-Screen Example"
      >
        This is the content of the full-screen dialog.
      </FullScreenDialog>
    </WeatherContainer>
  );
};

export default CurrentWeather;
