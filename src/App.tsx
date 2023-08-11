import React from 'react';
import './App.css';
import { lightTheme } from './theme';
import { ThemeProvider } from 'styled-components'; 


import Home from './pages/Dashboard';
import { GlobalStyles } from './app.styled';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyles />
      <Home />
    </ThemeProvider>
  );
};

export default App;

