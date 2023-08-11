import * as React from 'react';
import { useDispatch } from 'react-redux';
import { fetchWeather } from '../../store/fetchWeather';
import { SuggestionItem } from './styled';
import { AppDispatch } from '../../store/store';

interface ISuggestionProps {
  label: string;
  hideSuggestionFn: Function;
}

const Suggestion: React.FC<ISuggestionProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>();

  const onClick = () => {
    dispatch(fetchWeather(props.label.split(',')[0]));
    setTimeout(() => {
      props.hideSuggestionFn();
    }, 400);
  };

  return <SuggestionItem onClick={onClick}>{props.label}</SuggestionItem>;
};

export default Suggestion;
