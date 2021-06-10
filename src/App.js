import { CircularProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./App.css";
import DetailedWeather from "./components/detailed-right/DetailedWeather";
import SummaryToday from "./components/summary-left/SummaryToday";
import {
  fetch7DayForecastData,
  fetchBasicWeatherData,
} from "./reusable-functions/weather-api";

export const BasicWeatherContext = React.createContext();

function App() {
  const [basicWeather, setBasicWeather] = useState(null);
  const [forecastWeather, setForecastWeather] = useState(null);

  // console.log("basicWeather :>> ", basicWeather);
  // console.log("forecastWeather :>> ", forecastWeather);

  useEffect(() => {
    getBasicWeather("default");
  }, []);

  const getBasicWeather = async (type) => {
    const res = await fetchBasicWeatherData(type);
    setBasicWeather(res);
    // call detailed weather data with lat and long
    if (res.main) {
      const forecastResponse = await fetch7DayForecastData(
        res.coord.lat,
        res.coord.lon
      );
      setForecastWeather(forecastResponse);
    }
  };

  return (
    <div
      className="w-screen flex flex-wrap"
      style={{ backgroundColor: "#F6F6F8" }}
    >
      <BasicWeatherContext.Provider
        value={[
          basicWeather,
          setBasicWeather,
          forecastWeather,
          setForecastWeather,
        ]}
      >
        {!basicWeather && !forecastWeather ? (
          <div className="loading-screen flex flex-col justify-center items-center w-screen h-screen gap-y-4">
            <p className="text-xl mb-4">Loading Weather...</p>
            <CircularProgress size={30} style={{ color: "black" }} />
          </div>
        ) : (
          <>
            <SummaryToday />
            <DetailedWeather />
          </>
        )}
      </BasicWeatherContext.Provider>
    </div>
  );
}

export default App;
