import { useState, useEffect } from 'react';
import './css/app.css'

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  
  useEffect(() =>{
      const fetchData = async () => {
        // fetching the api data
        try {
          const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=d533f1523cea494a9dd81558240904&q=london&aqi=yes`);
          // parsing it to json
          const data = await response.json();
          // the weather data is then stored within the setweather variable as a JSON Object.
          setWeather(data);
        } catch (error) {
          setError(error.message);
        }
      };

      fetchData()
    }, [city, weather])
// I then made a search bar. when the button is clicked, displays the weather information
// to display weather information button click, i needed an event handle function
function handleDisplayWeather({ weather }) {

  return (
    <div>
      <h2>{weather.location.name}</h2>
      <img src={weather.current.icon} alt="weather icon"  />
      <p>Temperature: {weather.current.temp_c}°C</p>  
      <p>Humidity: {weather.humidity}</p>
      <p>Wind Speed: {weather.wind_kph} kph</p>
    </div>
  );
}

  return (
    <div className="app">
      <h1>Weather App</h1>
      <input type="search" value={city} id="search-id"  placeholder='search a city' onChange={(e)=>{setCity(e.target.value)}}/>
      <button onClick={handleDisplayWeather}> Search</button>

    </div>
  )
}




export default App;
