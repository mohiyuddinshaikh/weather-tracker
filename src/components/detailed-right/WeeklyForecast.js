import React, { useContext, useEffect, useState } from "react";
import { BasicWeatherContext } from "../../App";
import SevenDayForecast from "./7DayForecast";
import ChartComponent from "./ChartComponent";

export default function WeeklyForecast() {
  const [basicWeather, setBasicWeather, forecastWeather, setForecastWeather] =
    useContext(BasicWeatherContext);

  const [chartData, setChartData] = useState([]);

  const getWeekDay = (unixTimestamp) => {
    const day = new Date(unixTimestamp * 1000).toLocaleString("en-us", {
      weekday: "long",
    });
    return day;
  };

  function createData(max, min, day, description) {
    return { max, min, day, description };
  }

  useEffect(() => {
    if (forecastWeather) {
      populateChartData();
    }
  }, [forecastWeather]);

  const populateChartData = () => {
    const data = [];
    forecastWeather.daily.forEach((item, index) => {
      if (index !== 7) {
        data.push(
          createData(
            item.temp.max,
            item.temp.min,
            getWeekDay(item.dt),
            item.weather[0].description
          )
        );
      }
    });
    setChartData(data);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
      return (
        <div className="bg-white p-4 border border-gray-500 ">
          <p className="label capitalize">{label}</p>
          <p className="label capitalize">{`Description : ${payload[0].payload.description}`}</p>
          <p className="label capitalize">
            Max Temprature: {payload[1].value}&#176;
          </p>
          <p className="label capitalize">
            Min Temprature: {payload[0].value}&#176;
          </p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="w-full flex flex-col">
      <div className="flex flex-col" style={{ height: "45vh" }}>
        <div className="text-xl font-semibold pl-2 mb-6 mt-2">
          Weekly Forecast Chart
        </div>

        {forecastWeather && (
          <ChartComponent
            customData={chartData}
            xAxisDataKey="day"
            line1DataKey="min"
            line2DataKey="max"
            tooltipComponent={<CustomTooltip />}
          />
        )}
      </div>
      <div className="flex mt-4">
        <SevenDayForecast />
      </div>
    </div>
  );
}
