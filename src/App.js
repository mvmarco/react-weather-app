import axios from 'axios';

// by default when the page reloads we fetch Kbh data by default with UseEffect
import {useEffect, useState} from 'react';

function App() {

  // here we save our weather data in a React state
  // by default the data is null until the data is fetched
  const [weather, setWeather] = useState(null);

  // use effect when page load display data
  useEffect(() => {
    const location = axios.get(
      'http://api.weatherapi.com/v1/current.json?key=fb454c4007ae4b63b83154929212704&q=copenhagen&aqi=no'
    ).then((data) => {
        console.log(data.data)
        // data saved into a react state
        setWeather(data.data)
    }).catch(err => console.log(err, "Sorry something went wrong, try later"));
  },[])
  // another state to let the user search the city
  const [input, setInput] = useState('');
  // here we say, if the weather is present then show it otherwise not, to prevent errors
  return (
    <div>
      {weather && (
        <div>

          <div className="search">
            <input type="text"/>
            <button>Search</button>
          </div>

          <div className="weather-info">
            <h1>{weather.location.country}</h1>
            <h2>{weather.location.region}</h2>
            <div className="condition">
              <h3>{weather.current.condition.text}</h3>
              <img src={weather.current.condition.icon} alt="weather icon" />
              <h3>{weather.current.temp_c} Degree Celsius</h3>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default App;
