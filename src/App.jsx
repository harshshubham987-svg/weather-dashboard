import { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import Forecast from "./components/Forecast";
import HourlyPanel from "./components/HourlyPanel";
import { getBackgroundImage } from "./services/weatherApi";
import weatherLogo from "./assets/weather-logo.png";

import {
  getCoordinates,
  getWeather,
  getWeatherDescription,
  getLocationName,
  getForecast,
} from "./services/weatherApi";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [selectedDay, setSelectedDay] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    const location = await getCoordinates(city);

    if (!location) {
      setLoading(false);
      return;
    }

    const weather = await getWeather(location.lat, location.lon);

    const forecast = await getForecast(location.lat, location.lon);

    setWeatherData({
      name: location.name,
      ...weather,
      weatherText: getWeatherDescription(weather.code),
    });

    setForecastData(forecast);
    setLoading(false);
  };

  const handleLiveLocation = () => {
    setLoading(true);
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      try {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const cityName = await getLocationName();

        const weather = await getWeather(lat, lon);

        const forecast = await getForecast(lat, lon);

        setWeatherData({
          name: cityName,
          ...weather,
          weatherText: getWeatherDescription(weather.code),
        });

        setForecastData(forecast);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    },
    (error) => {
      setLoading(false);
      console.log(error.message);
    }
  );
};

  return (
    <div
      className="relative min-h-screen flex flex-col items-center px-4 pt-24 pb-8 bg-cover bg-center bg-fixed bg-no-repeat transition-all duration-700"
      style={{
        backgroundImage: weatherData
          ? `url(${getBackgroundImage(weatherData.code)})`
          : "linear-gradient(to bottom right, black, #0f172a, #164e63)",
      }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
      <h1 className="relative z-10 text-white text-5xl font-bold mb-8 flex items-center gap-4">
        Weather Dashboard

        <img
          src={weatherLogo}
          alt="Weather Logo"
          className="w-24 h-24 object-contain"
        />
      </h1>

      <div className="relative z-10">
        <SearchBar
        city={city}
        setCity={setCity}
        handleSearch={handleSearch}
        handleLiveLocation={handleLiveLocation}
        loading={loading}
      />
      </div>
      

      {weatherData ? (
        <>
          <div className="relative z-10 w-full flex justify-center">
            <WeatherCard weather={weatherData} />
          </div>

          <div className="relative z-10 w-full flex justify-center">
            <Forecast
              forecast={forecastData}
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
            />
          </div>

          <div className="relative z-10 w-full flex justify-center">
            <HourlyPanel
              forecast={forecastData}
              selectedDay={selectedDay}
            />
          </div>
        </>
      ) : (
        <div className="relative z-10 mt-20 text-center text-white">
          <div className="text-8xl animate-pulse mb-6">
            ☁️
          </div>

          <h2 className="text-4xl font-bold mb-4">
            Welcome to Weather Dashboard
          </h2>

          <p className="text-xl text-gray-300 max-w-2xl">
            Search any city or use live location to get
            real-time weather updates, 12-day forecast,
            and hourly weather insights.
          </p>
        </div>
      )}
      
    </div>
  );
}

export default App;