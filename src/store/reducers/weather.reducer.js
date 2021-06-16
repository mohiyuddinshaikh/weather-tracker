const initState = {
  currentWeather: null,
  advancedForecast: null,
};

const weatherReducer = (state = initState, action) => {
  if (action.type === "UPDATE_WEATHER") {
    state = {
      ...state,
      currentWeather: { ...action.payload },
    };
    return state;
  }

  if (action.type === "UPDATE_ADVANCED_FORECAST") {
    state = {
      ...state,
      advancedForecast: { ...action.payload },
    };
    return state;
  }

  return state;
};

export default weatherReducer;
