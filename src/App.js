import axios from 'axios';

// by default when the page reloads we fetch Kbh data by default with UseEffect
import {useEffect, useState} from 'react';

function App() {
  useEffect(() => {
    const location = axios.get(
      'http://api.weatherapi.com/v1/current.json?key=fb454c4007ae4b63b83154929212704&q=copenhagen&aqi=no'
    ).then((data) => {
      console.log(data)
    }).catch(err => console.log(err, "Sorry something went wrong, try later"));
  },[])
  return (
    <div>
      <h1>Weather App</h1>
    </div>
  );
}

export default App;
