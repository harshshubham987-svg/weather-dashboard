import axios from "axios";
import clearBg from "../assets/background/clear.jpg";
import cloudyBg from "../assets/background/cloudy.jpg";
import fogBg from "../assets/background/fog.png";
import nightClearBg from "../assets/background/night_clear.png";
import partlyCloudyBg from "../assets/background/partly_cloudy.png";
import rainBg from "../assets/background/rain.png";
import snowBg from "../assets/background/snow.png";
import stormBg from "../assets/background/storm.jpg";

export const getWeatherIconClass = (code) => {
  if (code === 0) return "wi-day-sunny";

  if ([1, 2, 3].includes(code))
    return "wi-cloudy";

  if ([45, 48].includes(code))
    return "wi-fog";

  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code))
    return "wi-rain";

  if ([71, 73, 75, 77].includes(code))
    return "wi-snow";

  if ([95, 96, 99].includes(code))
    return "wi-thunderstorm";

  return "wi-cloud";
};

export const getBackgroundImage = (code) => {
  if (code === 0) return clearBg;

  if ([1].includes(code)) return partlyCloudyBg;

  if ([2, 3].includes(code)) return cloudyBg;

  if ([45, 48].includes(code)) return fogBg;

  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code))
    return rainBg;

  if ([71, 73, 75, 77].includes(code))
    return snowBg;

  if ([95, 96, 99].includes(code))
    return stormBg;

  return clearBg;
};

export const getWeatherDescription = (code) => {
  if (code === 0) return "Clear Sky ☀️";
  if ([1, 2, 3].includes(code)) return "Partly Cloudy ☁️";
  if ([45, 48].includes(code)) return "Fog 🌫";
  if ([51, 53, 55, 61, 63, 65].includes(code)) return "Rain 🌧";
  if ([71, 73, 75, 77].includes(code)) return "Snow ❄️";
  if ([80, 81, 82].includes(code)) return "Rain Showers 🌦";
  if ([95, 96, 99].includes(code)) return "Thunderstorm ⛈";
  return `Weather Code: ${code}`;
};

export const getCoordinates = async (city) => {
  const res = await axios.get(
    `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
  );

  if (res.data.results) {
    const place = res.data.results[0];

    return {
      name: place.name,
      lat: place.latitude,
      lon: place.longitude,
    };
  }
};

export const getWeather = async (lat, lon) => {
  const res = await axios.get(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m`
  );

  return {
    temp: res.data.current.temperature_2m,
    wind: res.data.current.wind_speed_10m,
    code: res.data.current.weather_code,
    humidity: res.data.current.relative_humidity_2m,
    feelsLike: res.data.current.apparent_temperature,
  };
};

export const getLocationName = async () => {
  try {
    const res = await axios.get("http://ip-api.com/json/");

    return res.data.city;
  } catch (error) {
    console.log(error);
    return "Your Location";
  }
};

export const getForecast = async (lat, lon) => {
  const res = await axios.get(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,weathercode&hourly=temperature_2m,weathercode&forecast_days=12&timezone=auto`
  );

  return {
    daily: res.data.daily,
    hourly: res.data.hourly,
  };
};

export const getWeatherIcon = (code) => {
  if (code === 0) return "☀️";
  if ([1, 2, 3].includes(code)) return "⛅";
  if ([45, 48].includes(code)) return "🌫️";
  if ([51, 53, 55, 61, 63, 65].includes(code)) return "🌧️";
  if ([71, 73, 75, 77].includes(code)) return "❄️";
  if ([80, 81, 82].includes(code)) return "🌦️";
  if ([95, 96, 99].includes(code)) return "⛈️";

  return "☁️";
};