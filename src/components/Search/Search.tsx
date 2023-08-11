import React, { useEffect, useRef, useState } from 'react';
import { fetchCities, fetchCurrentLocation } from './../../api/weather';
import { LocationButton, LocationIcon, SearchElement, SearchIcon, SearchInput, SearchResult } from './styled';
import Suggestion from './Suggestions';
import { setCurrentCity } from '../../store/reducers/citySlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { fetchWeather } from '../../store/fetchWeather';

const Search: React.FC = () => {
  const suggestionRef = useRef(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!searchTerm) {
      return;
    }
    setShowSuggestions(true);
    fetchCities(searchTerm).then((res) => {
      setSuggestions(res);
    });
  }, [searchTerm]);


  const onSearchInputChanged = (e: any) => {
    setSearchTerm(e.target.value);
  };
  const showWeather = (place : string) => {
    console.log(place)
    if(place){
    dispatch(fetchWeather(place));
    }
  };
  const getCurrentLocation =() =>{
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          try {
            fetchCurrentLocation(latitude,longitude).then((response) => {
              const city = response.address.city || response.address.town || 'Unknown City';
              dispatch(setCurrentCity(city));
              showWeather(city);
            });
            
          } catch (error) {
            console.error('Error fetching city:', error);
          }
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
    else {
      alert('Geolocation is not supported by this browser.');
    }
  }

  return (
    <SearchElement>
      <SearchIcon />
      <SearchInput value={searchTerm} onChange={onSearchInputChanged} placeholder="Search for location"/>
      <LocationButton
        onClick={() => {getCurrentLocation()}}
      >
        <LocationIcon />
      </LocationButton>
      {showSuggestions && (
        <SearchResult ref={suggestionRef}>
          {suggestions?.slice(0, 6)?.map((s, i) => (
            <Suggestion
              key={i}
              label={s}
              hideSuggestionFn={() => {
                setShowSuggestions(false);
              }}
            />
          ))}
        </SearchResult>
      )}
    </SearchElement>
  );
};

export default Search;
