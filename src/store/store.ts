import { configureStore } from '@reduxjs/toolkit';
import appReducer from './reducers/appReducer';
import weatherReducer from './reducers/weatherReducer';
import cityReducer from './reducers/citySlice';

const store = configureStore({
  reducer: {
    app: appReducer,
    weather: weatherReducer,
    city: cityReducer,
  },
});

export type AppStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
