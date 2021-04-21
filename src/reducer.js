const reducer = (state, action) => {
  if (action.type === "CHANGE_CITY") {
    return { ...state, city: action.payload };
  }
  if (action.type === "NO_CITY") {
    return {
      ...state,
      city: "seattle",
      units: "imperial",
      temp: "",
      temp_max: "",
      temp_min: "",
      icon: "",
      main: "",
      lat: "",
      lon: "",
    };
  }
  if (action.type === "SET_UP_DATA") {
    const {
      name,
      lat,
      lon,
      temp,
      temp_min,
      temp_max,
      main,
      icon,
    } = action.payload;
    console.log(action.payload);
    return {
      ...state,
      city: name,
      lat,
      lon,
      temp,
      temp_min,
      temp_max,
      main,
      icon,
    };
  }

  if (action.type === "SEARCH_DAILY") {
    return { ...state, daily: [...action.payload] };
  }
  if (action.type === "CHANGE_UNITS") {
    if (state.units === "imperial") {
      return { ...state, units: "metric" };
    } else {
      return {
        ...state,
        units: "imperial",
      };
    }
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default reducer;
