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
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default reducer;
