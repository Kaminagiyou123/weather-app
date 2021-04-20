import React, { useContext, useReducer } from "react";
import reducer from "./reducer";

const initialState = {
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

const ProductsContext = React.createContext();
export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const SearchCity = (item) => {
    dispatch({ type: "CHANGE_CITY", payload: item });
  };
  const dataPull = (item) => {
    dispatch({ type: "SET_UP_DATA", payload: item });
  };
  const noCity = () => {
    dispatch({ type: "NO_CITY" });
  };

  return (
    <ProductsContext.Provider
      value={{
        ...state,
        SearchCity,
        noCity,
        dataPull,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext);
};
