import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CityState {
  currentCity: string;
}

const initialState: CityState = {
  currentCity: '',
};

const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    setCurrentCity: (state, action: PayloadAction<string>) => {
      state.currentCity = action.payload;
    },
  },
});

export const { setCurrentCity } = citySlice.actions;
export default citySlice.reducer;
