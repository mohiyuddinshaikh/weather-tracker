import React, { useState, useEffect, useContext } from "react";
import SearchBar from "./SearchBar";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import { BasicWeatherContext } from "../../App";

function SummaryToday(props) {
  const [basicWeather, setBasicWeather, forecastWeather, setForecastWeather] =
    useContext(BasicWeatherContext);

  const [backgroundColor, setBackgroundColor] = useState(null);

  useEffect(() => {
    if (basicWeather) {
      getBackgroundColor(basicWeather.weather[0].id);
    }
  }, [basicWeather]);

  const QuickSummary = (props) => {
    const { icon, text, marginRight } = props;
    return (
      <div className="flex w-3/4 bg-white rounded-lg my-2 font-normal text-lg h-16 shadow-lg">
        <div className="flex justify-center items-center shadow-2xl w-1/3  py-3 rounded-r-lg">
          {icon}
        </div>
        <div className="flex flex-wrap justify-center items-center w-2/3  py-3 rounded-r-lg bg-gray-300">
          {text}
        </div>
      </div>
      // <div className="flex items-center px-1 text-xl">
      //   <div
      //     className="p-3 mr-2"
      //     style={{ marginRight: marginRight ? "20px" : null }}
      //   >
      //     {icon}
      //   </div>
      //   <div style={{ marginRight: marginRight ? "30px" : null }}>
      //     <p className="font-medium text-gray-600">{text}</p>
      //   </div>
      // </div>
    );
  };

  const KnowledgeBlock = () => {
    const day = new Date(basicWeather.dt * 1000).toLocaleDateString("en-US", {
      weekday: "long",
    });

    return (
      <div className="flex flex-col items-center mt-4">
        <span className="mt-4" style={{ fontSize: 30 }}>
          {basicWeather.name}, {basicWeather.sys.country}
        </span>
        <img
          src={`http://openweathermap.org/img/wn/${basicWeather.weather[0].icon}@4x.png`}
        />
        <div className="flex items-start">
          <span style={{ fontSize: 40 }}>{basicWeather.main.temp}</span>
          <span className="mt-2" style={{ fontSize: 20 }}>
            &#8451;
          </span>
        </div>
        <div className="text-gray-600" style={{ fontSize: 25 }}>
          {day}
        </div>
        <hr className="text-black w-full mb-6 mt-8" />
        <QuickSummary
          icon={
            <img
              src={`http://openweathermap.org/img/wn/${basicWeather.weather[0].icon}.png`}
            />
          }
          text={
            <span className="pl-2 capitalize">
              {basicWeather.weather[0].description}
            </span>
          }
        />
        <QuickSummary
          icon={<ArrowUpwardIcon fontSize="default" />}
          text={
            <>
              <span className="pl-2">{basicWeather.main.temp_max}</span>
              <span style={{ fontSize: 12 }}>&#8451;</span>
            </>
          }
          marginRight={true}
        />
        <QuickSummary
          icon={<ArrowDownwardIcon fontSize="default" />}
          text={
            <>
              <span className="pl-2">{basicWeather.main.temp_min}</span>
              <span style={{ fontSize: 12 }}>&#8451;</span>
            </>
          }
          marginRight={true}
        />
      </div>
    );
  };

  const getBackgroundColor = (code) => {
    const codeShortcut = Math.floor(code / 100);
    if (code === 800) {
      // clear
      setBackgroundColor("linear-gradient(to top, #2980b9, #6dd5fa, #ffffff)");
      return;
    } else {
      let bgString;
      switch (codeShortcut) {
        case 2:
          // thunderstorm
          bgString = `linear-gradient(to top, #8e9eab, #eef2f3)`;
          break;
        case 3:
          // drizzle
          bgString = `linear-gradient(to top, #aaffa9, #11ffbd)`;
          break;
        case 5:
          // rain
          bgString = `linear-gradient(to top, #8e9eab, #eef2f3)`;
          break;
        case 6:
          // snow
          bgString = "linear-gradient(to top, #2980b9, #6dd5fa, #ffffff)";
          break;
        case 7:
          // atmosphere
          bgString = `linear-gradient(to top, #efefbb, #d4d3dd)`;
          break;
        case 8:
          // clouds
          bgString = `linear-gradient(to top, #8e9eab, #eef2f3)`;
          break;

        default:
          bgString = "linear-gradient(to top, #2980b9, #6dd5fa, #ffffff)";
          break;
      }
      setBackgroundColor(bgString);
      return bgString;
    }

    // blue - clear, snow
    // return "linear-gradient(to top, #2980b9, #6dd5fa, #ffffff)";
    //  atmosphere
    // `linear-gradient(to top, #efefbb, #d4d3dd)`
    // green-blue -> drizzle
    // `linear-gradient(to top, #aaffa9, #11ffbd)`
    // gray - rain, clouds, thunderstorm
    //  `linear-gradient(to top, #8e9eab, #eef2f3)`
  };

  return (
    <div
      className="w-full sm:w-full md:w-1/4 h-screen px-4 py-8 md:p-10 shadow"
      style={{
        background: backgroundColor,
      }}
    >
      <SearchBar
        setBasicWeather={setBasicWeather}
        setForecastWeather={setForecastWeather}
      />
      {basicWeather && <KnowledgeBlock />}
    </div>
  );
}

export default SummaryToday;
