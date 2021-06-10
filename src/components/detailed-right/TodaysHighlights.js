import React, { useContext } from "react";
import { BasicWeatherContext } from "../../App";
import { getWindDirection } from "../../reusable-functions/wind-direction";
import humidity from "../../assets/images/humidity.svg";
import wind from "../../assets/images/wind.svg";
import cloud from "../../assets/images/cloud.svg";
import sunrise from "../../assets/images/sunrise.svg";
import sunset from "../../assets/images/sunset.svg";
import pressure from "../../assets/images/pressure.svg";
import SevenDayForecast from "./7DayForecast";
import { useCustomMediaQuery } from "../../custom-hooks/useCustomMediaQuery";

export default function TodaysHighlights() {
  const [basicWeather, setBasicWeather, forecastWeather, setForecastWeather] =
    useContext(BasicWeatherContext);

  const { isMobile, isTab, isDesktop, isLargeScreen } = useCustomMediaQuery();

  const InfoCard = (props) => {
    const { title, description, additional } = props;
    return (
      <div className="flex flex-col p-3 w-full md:w-1/3">
        <div className="px-4 py-2 bg-white rounded-lg shadow flex flex-col items-center md:items-start">
          <div className="py-2 text-gray-400 text-xl w-full">{title}</div>
          <div className="py-2 font-semibold text-3xl">{description}</div>
          <div className="py-2 text-lg">{additional}</div>
        </div>
      </div>
    );
  };

  const InfoCardTitle = (props) => {
    const { text, icon } = props;
    return (
      <div class="flex justify-center md:justify-start gap-x-1 ">
        <div class="flex-none ">
          <img src={icon} height="25px" width="25px" />
        </div>
        <div class="flex-none">
          <span className="pl-2">{text}</span>
        </div>
      </div>
    );
  };

  const getSunriseAndSunsetTime = (mode) => {
    let unix;
    if (mode === "rise") {
      unix = basicWeather.sys.sunrise;
    }
    if (mode === "set") {
      unix = basicWeather.sys.sunset;
    }
    let date = new Date(unix * 1000);
    const usaTime = date.toLocaleString("en-US", {
      timeZone: "America/New_York",
      hour: "numeric",
      minute: "numeric",
      hour12: "true",
    });
    return usaTime;
  };

  const TodaysHlts = () => {
    return (
      <>
        <p className="text-xl font-semibold pl-2">Today's Highlights</p>
        {basicWeather && (
          <div className="flex flex-wrap w-full">
            <InfoCard
              title={<InfoCardTitle text="Humidity" icon={humidity} />}
              description={`${basicWeather.main.humidity}%`}
              additional="Normal"
            />
            <InfoCard
              title={<InfoCardTitle text="Wind" icon={wind} />}
              description={
                <div>{(basicWeather.wind.speed * 3.6).toFixed(2)} km/hr</div>
              }
              additional={getWindDirection(270)}
            />
            {/* <InfoCard
              title={<InfoCardTitle text="Visibility" icon={visibility} />}
              description={`${basicWeather.visibility / 1000} km`}
              additional="Normal"
            /> */}
            <InfoCard
              title={<InfoCardTitle text="Pressure" icon={pressure} />}
              description={`${basicWeather.main.pressure} hPa`}
              additional="Normal"
            />
            <InfoCard
              title={<InfoCardTitle text="Cloudiness" icon={cloud} />}
              description={`${basicWeather.clouds.all}%`}
              additional="Normal"
            />
            <InfoCard
              title={<InfoCardTitle text="Sunrise" icon={sunrise} />}
              description={getSunriseAndSunsetTime("rise")}
              additional="Normal"
            />
            <InfoCard
              title={<InfoCardTitle text="Sunset" icon={sunset} />}
              description={getSunriseAndSunsetTime("set")}
              additional="Normal"
            />
          </div>
        )}
      </>
    );
  };

  return (
    <div className="flex flex-col w-full">
      <TodaysHlts />
      <SevenDayForecast />
    </div>
  );
}
