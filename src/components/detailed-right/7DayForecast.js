import React, { useContext } from "react";
import uparrow from "../../assets/images/up-arrow.svg";
import downarrow from "../../assets/images/down-arrow.svg";
import { BasicWeatherContext } from "../../App";

export default function SevenDayForecast(props) {
  const [basicWeather, setBasicWeather, forecastWeather, setForecastWeather] =
    useContext(BasicWeatherContext);

  const ForecastInfoCard = (props) => {
    const { day, icon, max_temp, min_temp } = props;
    return (
      <div className="flex flex-col py-3 px-2 w-full md:w-1/3">
        <div className="gap-y-2 md:gap-y-3 px-2 py-4 bg-white rounded-lg shadow hover:shadow-lg cursor-pointer flex flex-col items-center">
          <div className=" text-gray-400 text-lg md:text-lg">{day}</div>
          <div className="font-semibold text-md">
            <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} />
          </div>

          <div class="flex gap-x-4 items-center ">
            <div class="flex-none ">
              <img src={uparrow} height="15px" width="15px" />
            </div>
            <div class="flex-none">{max_temp} &#8451;</div>
          </div>

          <div class="flex gap-x-4 items-center ">
            <div class="flex-none ">
              <img src={downarrow} height="15px" width="15px" />
            </div>
            <div class="flex-none">{min_temp} &#8451;</div>
          </div>
        </div>
      </div>
    );
  };

  const getWeekDay = (unixTimestamp) => {
    const day = new Date(unixTimestamp * 1000).toLocaleString("en-us", {
      weekday: "long",
    });
    return day;
  };

  return (
    <div className="flex flex-col w-full">
      <div className="text-xl font-semibold pl-2 mt-4 ">7 Day Forecast</div>
      <div className="flex flex-wrap md:flex-nowrap w-full">
        {forecastWeather &&
          forecastWeather.daily.map((item, index) => {
            return index > 0 ? (
              <ForecastInfoCard
                day={getWeekDay(item.dt)}
                icon={item.weather[0].icon}
                max_temp={item.temp.max}
                min_temp={item.temp.min}
              />
            ) : null;
          })}
      </div>
    </div>
  );
}
