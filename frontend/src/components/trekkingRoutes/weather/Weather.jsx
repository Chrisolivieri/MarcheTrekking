import React, { useEffect, useState } from "react";
import "./Weather.css";


const Weather = ({start}) => {

    const allIcons = {
        "01d": `${process.env.PUBLIC_URL}/assets/clear.png`,
        "01n": `${process.env.PUBLIC_URL}/assets/clear.png`,
        "02d": `${process.env.PUBLIC_URL}/assets/cloud.png`,
        "02n": `${process.env.PUBLIC_URL}/assets/cloud.png`,
        "03d": `${process.env.PUBLIC_URL}/assets/cloud.png`,
        "03n": `${process.env.PUBLIC_URL}/assets/cloud.png`,
        "04d": `${process.env.PUBLIC_URL}/assets/drizzle.png`,
        "04n": `${process.env.PUBLIC_URL}/assets/drizzle.png`,
        "09d": `${process.env.PUBLIC_URL}/assets/rain.png`,
        "09n": `${process.env.PUBLIC_URL}/assets/rain.png`,
        "10d": `${process.env.PUBLIC_URL}/assets/rain.png`,
        "10n": `${process.env.PUBLIC_URL}/assets/rain.png`,
        "13d": `${process.env.PUBLIC_URL}/assets/snow.png`,
        "13n": `${process.env.PUBLIC_URL}/assets/snow.png`,
        
    }
    const [weather, setWeather] = useState(false);

  const search = async () => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${start[0]}&lon=${start[1]}&units=metric&appid=${process.env.REACT_APP_OPEN_WEATHER_API}`;

      const response = await fetch(url);
      const data = await response.json();
      console.log(data)
      const icon = allIcons[data.weather[0].icon] || `${process.env.PUBLIC_URL}/assets/clear.png`
      setWeather({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon
      })
    } catch (error) {}
  };

useEffect(()=>{
    search()
},[])
  return (
    <div className="weather">
      
      <img className="weather-icon" src={weather.icon} alt="" />
      <p className="temperature">{weather.temperature}°C</p>
      <p className="weather-location">{weather.location}</p>
      <div className="weather-data">
        <div className="col">
          <img src="/assets/humidity.png" alt="" />
          <div className="d-flex flex-column align-items-center">
            <p>{weather.humidity} %</p>
            <span>Umidità</span>
          </div>
        </div>
        <div className="col">
          <img src="/assets/wind.png" alt="" />
          <div className="d-flex flex-column align-items-center">
            <p>{weather.windSpeed} km/h</p>
            <span>Velocità vento</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
