import { useState} from 'react';
import './css/app.css'
// vite does not need to import react
function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState("");
  const [error, setError] = useState(null);

  const cityInput = document.querySelector('#search-id');

  //button event handler
  function handleClick(){
    fetchData({city})
  }

  
    const fetchData = async (cityvalue) => {
        setCity(cityInput.value)
        // fetching the api data
        try {
          const response = await fetch(`${import.meta.env.VITE_URL}?key=${import.meta.env.VITE_API_KEY}&q=${cityvalue}&aqi=yes`);
          // parsing it to json
          const data = await response.json();
          // the weather data is then stored within the setweather variable as a JSON Object.
          setWeather(data);
        } catch (error) {
          setError("Error");
        }
      }

// I then made a search bar. when the button is clicked, displays the weather information
// to display weather information button click, i needed an event handle function


  return (
    <div className="app">
      <h1>Weather App</h1>
      <input type="search"  id="search-id"  placeholder='search a city'/>
      <button onClick={handleClick}> Search</button>

      {weather === ''? <WelcomePage /> : error === 404? <ErrorPage /> : <WeatherDisplay />}

      
    

    </div>
  )
}
// COMPONENT ONE: Weather DISPLAY

function WeatherDisplay(weather) {

  return(
    <div>
      <h2>{weather.location.name}</h2>
      <img src={weather.current.condition.icon} alt="weather icon" />
      <p>Temperature: {weather.current.temp_c}°C</p>  
      <p>Humidity: {weather.current.humidity}</p>
      <p>Wind Speed: {weather.current.wind_kph} kph</p>
    </div>
  )
}

// COMPONENT TWO: Welcomme page

function WelcomePage(){

  return(
    <h3>Welcome</h3>
  )
}

//   COMPONENT THREE: Error page

function ErrorPage(){

  return(
    <div>
      <h3>The page you are looking for is not found</h3>
    </div>
  )
}



export default App;
