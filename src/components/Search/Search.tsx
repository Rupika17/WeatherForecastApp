import React, { useEffect, useRef, useState } from 'react';
import { fetchCities } from './../../api/weather';
import { SearchElement, SearchIcon, SearchInput, SearchResult } from './styled';
import Suggestion from './Suggestions';

const Search: React.FC = () => {
  const suggestionRef = useRef(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

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
 
  return (
    <SearchElement>
      <SearchIcon />
      <SearchInput value={searchTerm} onChange={onSearchInputChanged} placeholder="Search for location"/>
      {/* <DebounceInput debounceTimeout={300} onChange={onSearchInputChanged} placeholder="Search for location" /> */}
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
