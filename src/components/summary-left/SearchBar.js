import React, { useRef, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import {
  fetch7DayForecastData,
  fetchBasicWeatherData,
} from "../../reusable-functions/weather-api";
import { useDispatch } from "react-redux";
import * as WeatherActions from "../../store/actions/weather.action";

export default function SearchBar(props) {
  let dispatch = useDispatch();
  const { setBasicWeather, setForecastWeather } = props;

  const [searchText, setSearchText] = useState(null);
  const inputRef = useRef();

  const handleSearchText = (e) => {
    setSearchText(e.target.value);
  };

  const handleFetchDataByZipCode = async () => {
    try {
      const res = await fetchBasicWeatherData("custom", searchText, "us"); //searchText- ZIP code, us - Country code for USA
      if (res.cod === "404") {
        alert(res.message);
        return;
      }
      if (res.main) {
        const forecastResponse = await fetch7DayForecastData(
          res.coord.lat,
          res.coord.lon
        );
        setBasicWeather(res);
        setForecastWeather(forecastResponse);
        dispatch(WeatherActions.updateWeather(res));
        dispatch(WeatherActions.updateAdvanceForecast(forecastResponse));
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  return (
    <div className="appearance-none block flex item-center bg-white w-full text-gray-700 py-3 px-4 leading-tight border hover:shadow-md focus:shadow-md rounded-full">
      <div className="flex-grow flex items-center px-1">
        <input
          ref={inputRef}
          className="bg-transparent focus:border-0 focus:outline-none w-full"
          type="text"
          placeholder="Search by ZIP Code"
          onChange={(e) => handleSearchText(e)}
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              handleFetchDataByZipCode();
              inputRef.current.blur();
            }
          }}
        />
      </div>
      <div className="flex-none cursor-pointer px-1">
        <SearchIcon
          style={{ color: "gray" }}
          onClick={() => handleFetchDataByZipCode()}
        />
      </div>
    </div>
  );
}
