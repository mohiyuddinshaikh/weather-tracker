import React from "react";
import TodaysHighlights from "./TodaysHighlights";
import WeeklyForecast from "./WeeklyForecast";
import CustomizedTabs from "./TabComponent";

export default function DetailedWeather() {
  return (
    <div
      className="w-full sm:w-full md:w-3/4 px-4 py-8 md:p-10"
      style={{ backgroundColor: "#F6F6F8" }}
    >
      <CustomizedTabs
        tabNames={["Today", "Week Forecast Chart"]}
        tabComponents={[<TodaysHighlights />, <WeeklyForecast />]}
      />
    </div>
  );
}
