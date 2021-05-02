import axios from 'axios';
// by default when the page reloads we fetch Kbh data by default with UseEffect
import {useEffect, useState} from 'react';
// import styled components
import styled from "styled-components";
// img
import img from './img/sky.jpg'
function App() {

  // here we save our weather data in a React state
  // by default the data is null until the data is fetched
  const [weather, setWeather] = useState(null);
  
  // another state to let the user search the city
  const [input, setInput] = useState('');

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

  // event
  const handleInputWeather = (e) => {
    console.log(e.target.value);
    setInput(e.target.value);
  }

  const searchWeather = () => {
   axios.get(
     `http://api.weatherapi.com/v1/current.json?key=fb454c4007ae4b63b83154929212704&q=${input}&aqi=no`
   ).then((data) => {
     setWeather(data.data)
   }).catch(err => console.log(err, "City not found, try again"));
    setInput("");
  }

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      e.preventDefault();
      searchWeather();
      setInput("")
    }
  };
  // here we say, if the weather is present then show it otherwise not, to prevent errors
  return (
    <AppStyle>
      {weather && (
        <WeatherContainer>
          <div className="search">
            <input value={input} type="text" onChange={handleInputWeather} onKeyPress={handleKeypress} />
            <button onClick={searchWeather} type="submit">
              Search
            </button>
          </div>

          <div className="weather-info">
            <h1>{weather.location.country}</h1>
            <h2>{weather.location.name}</h2>
            <div className="condition">
              <h3>Sky: {weather.current.condition.text}</h3>
              <img src={weather.current.condition.icon} alt="weather icon" />
              <h3>Temperature: {weather.current.temp_c} Degree Celsius</h3>
              <h3>Feels like: {weather.current.feelslike_c} Degree Celsius</h3>
              <h3>Wind: {weather.current.wind_kph} km/h </h3>
            </div>
          </div>
        </WeatherContainer>
      )}
    </AppStyle>
  );
};


const AppStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-image: url(${img});
  background-size: 100% 100%;
`;
const WeatherContainer = styled.div`
  margin: 2.5rem;
  padding: 2.5rem;
  border-radius: 20px;
  background-color: rgba(239, 255, 255, 0.5);
  input {
    padding: 0.5rem;
    border: none;
    border-radius: 20px;
    box-shadow: 0px 0px 10px rgba(239, 255, 255, 0.5);
    margin-right: 10px;
  }
  Input:focus-visible {
    outline: none;
  }
  button {
    border: none;
    padding: 0.5rem;
    border-radius: 20px;
    background: #56b6d4;
    color: white;
    box-shadow: 0px 0px 10px rgba(239, 255, 255, 0.5);
    cursor: pointer;
    :hover {
      color: white;
      background: #fdb30a;
    }
  }
  @media (max-width: 518px) {
    padding: 1.5rem;
    margin: 1.5rem;
  }
`;


export default App;
