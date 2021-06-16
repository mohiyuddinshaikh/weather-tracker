const UPDATE_WEATHER = "UPDATE_WEATHER";
const UPDATE_ADVANCED_FORECAST = "UPDATE_ADVANCED_FORECAST";

export function updateWeather(data) {
  return {
    type: UPDATE_WEATHER,
    payload: data,
  };
}

export function updateAdvanceForecast(data) {
  return {
    type: UPDATE_ADVANCED_FORECAST,
    payload: data,
  };
}
