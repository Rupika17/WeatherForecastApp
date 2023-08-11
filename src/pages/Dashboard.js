import React from "react";
import Search from "../components/Search/Search";
import Header from "../components/Header/Header";
import CurrentWeather from "../components/CurrentWeather/CurrentWeather";
import Footer from "../components/Footer/Footer";
import Forecast from "../components/Forecast/Forecast";

const Home = () => {
  return (
    <>
      <Header />
      <Search />
      <CurrentWeather />
      <Forecast />
      <Footer />
    </>
  );
};

export default Home;
