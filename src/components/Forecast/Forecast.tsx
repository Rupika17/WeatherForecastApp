import React from 'react';
import { useSelector } from 'react-redux';
import { AppStore } from '../../store/store';
import ForecastItem from './ForecastItem';
import { ForecastContainer, ForecastItems, SectionTitle } from './styled';
import { TempUnit } from '../../utils/unitConversion';

const Forecast: React.FC = () => {
  const { forecast, isInitial, degreeType } = useSelector((state: AppStore) => ({
    loading: state.app.isLoading,
    isInitial: state.app.isInitial,
    forecast: state.weather.extendedWeatherData,
    degreeType: state.app.tempUnit,
  }));

  if (isInitial) return <></>;

  return (
    <ForecastContainer>
      <SectionTitle>Extended Forecast</SectionTitle>
      <ForecastItems>
        {forecast.map((item, i) => {
          return (
            <ForecastItem
              key={i}
              day={item.day}
              high={degreeType === TempUnit.CELCIUS ? item.temp.temp_max_c : item.temp.temp_max_f}
              low={degreeType === TempUnit.CELCIUS ? item.temp.temp_min_c : item.temp.temp_min_f}
              weatherCode={item.weather.id}
              main={item.weather.main}
            />
          );
        })}
      </ForecastItems>
    </ForecastContainer>
  );
};

export default Forecast;
