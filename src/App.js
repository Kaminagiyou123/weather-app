import "./App.css";
import View from "./View.jpg";
function App() {
  return (
    <div className='App'>
      <div className='main-box'>
        <h1>Seattle, WA Weather</h1>
        <div className='info-box'>
          <div className='info-box-left'>
            <div className='grey-font'>As of 7:05 pm PDT</div>
            <h2 className='bold-font'>79°F</h2>
            <div>Sunny</div>
          </div>
          <div className='info-box-right'>
            <div>Sunny Icon</div>
            <div>High/Low</div>
            <input
              type='text'
              placeholder='Enter the City Name'
              className='search-box'
            />
          </div>
        </div>
      </div>
      <div className='main-box-2'>Daily Weather</div>
      <img src={View} alt='main image' className='main-img' />
    </div>
  );
}

export default App;
