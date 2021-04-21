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
    searchDaily,
    lat,
    lon,
    daily,
    changeUnits,
  } = useProductsContext();

  const url = `http://api.openweathermap.org/data/2.5/find?q=${city}&units=${units}&appid=${process.env.REACT_APP_API_KEY}`;

  const fetchData = async (url) => {
    try {
      const response = await axios.get(url);
      if (response.data.list.length > 0) {
        const {
          name,
          coord: { lat, lon },
          main: { temp, temp_min, temp_max },
        } = response.data.list[0];
        const { main, icon } = response.data.list[0].weather[0];
        dataPull({ name, lat, lon, temp, temp_min, temp_max, main, icon });
      } else {
        noCity();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const newUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${units}&appid=${process.env.REACT_APP_API_KEY}`;
  const fetchDailyData = async (url) => {
    try {
      const response = await axios.get(url);
      console.log(response.data.daily);
      if (response.cod >= 400) {
        console.log(response.message);
      } else {
        searchDaily(response.data.daily);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData(url);
  }, [city, units]);

  useEffect(() => {
    var today = new Date();
    var time =
      today.getHours() +
      ":" +
      (today.getMinutes() < 10 ? "0" : "") +
      today.getMinutes();

    setNewDate(time);
  }, []);

  useEffect(() => {
    fetchDailyData(newUrl);
    console.log(daily);
  }, [lat, lon, units]);

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
            <button
              className='units'
              onClick={(e) => {
                e.preventDefault();
                changeUnits();
              }}
            >
              {units.toUpperCase()}
            </button>
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
      <div className='main-box-2'>
        Daily Weather
        {daily?.map((item, index) => {
          const { min, max } = item.temp;
          const { main, icon } = item.weather[0];
          var gsDayNames = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ];

          var d = new Date();
          var dayName = gsDayNames[(d.getDay() + index + 1) % 7];

          return (
            <div key={index} className='daily-container'>
              {index === 0 && <div>Today</div>}

              {index > 0 && <div>{dayName}</div>}

              <img
                src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
                alt={main}
                className='icon'
              />

              <div>
                High/Low : {min}/{max}
              </div>
            </div>
          );
        })}
      </div>
      <img src={View} alt='main image' className='main-img' />
    </div>
  );
}

export default App;
