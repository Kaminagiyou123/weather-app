import "./App.css";
import { useEffect, useState } from "react";
import View from "./View.jpg";
import { useProductsContext } from "./Context";
import axios from "axios";

function App() {
  const [newDate, setNewDate] = useState(null);
  const {
    city,
    SearchCity,
    units,
    dataPull,
    temp,
    temp_min,
    temp_max,
    main,
    icon,
    noCity,
  } = useProductsContext();

  const url = `http://api.openweathermap.org/data/2.5/find?q=${city}&units=${units}&appid=${process.env.REACT_APP_API_KEY}`;

  const fetchData = async (url) => {
    try {
      const response = await axios.get(url);
      console.log(response);
      if (response.data.list.length > 0) {
        const {
          name,
          coord: { lat, lon },
          main: { temp, temp_min, temp_max },
        } = response.data.list[0];
        const { main, icon } = response.data.list[0].weather[0];
        dataPull({ name, lat, lon, temp, temp_min, temp_max, main, icon });
      } else {
        console.log("No City Found");
        noCity();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData(url);
  }, [city]);

  useEffect(() => {
    var today = new Date();
    var time =
      today.getHours() +
      ":" +
      (today.getMinutes() < 10 ? "0" : "") +
      today.getMinutes();

    setNewDate(time);
  }, []);

  return (
    <div className='App'>
      <div className='main-box'>
        <h2>{city.toUpperCase()} Weather</h2>
        <div className='info-box'>
          <div className='info-box-left'>
            <div className='grey-font'>As of {newDate} Today</div>
            <h2 className='bold-font'>{temp}</h2>
            <div>{main}</div>
          </div>
          <div className='info-box-right'>
            <div className='icon-container'>
              <img
                src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
                alt={main}
                className='icon'
              />
            </div>
            <div>
              High/Low : {temp_min}/{temp_max}
            </div>
            <div className='city-submission'>
              <input
                type='text'
                placeholder='Enter the City Name'
                className='search-box'
              />
              <button
                className='search-btn'
                onClick={(e) => {
                  e.preventDefault();
                  SearchCity(e.target.previousElementSibling.value);
                }}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='main-box-2'>Daily Weather</div>
      <img src={View} alt='main image' className='main-img' />
    </div>
  );
}

export default App;
