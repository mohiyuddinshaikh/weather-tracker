import { METRIC_UNIT } from "../constants";

const fetchBasicWeatherData = async (type, zipCode, countryCode) => {
  try {
    /**
     * type : default, custom
     */
    let apiString;
    if (type === "default") {
      apiString = `https://api.openweathermap.org/data/2.5/weather?zip=10008,us&units=${METRIC_UNIT}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`;
    }
    if (type === "custom") {
      apiString = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},${countryCode}&units=${METRIC_UNIT}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`;
    }
    const res = await fetch(apiString);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error :>> ", error);
  }
};

const fetch7DayForecastData = async (lat, lon) => {
  const excludeString = "minutely,hourly,alerts";
  try {
    let apiString = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${METRIC_UNIT}&exclude=${excludeString}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`;
    const res = await fetch(apiString);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error :>> ", error);
  }
};

export { fetchBasicWeatherData, fetch7DayForecastData };
