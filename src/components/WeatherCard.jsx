import { getWeatherIconClass } from "../services/weatherApi";

function WeatherCard({ weather }) {
  if (!weather) return null;

  return (
    <div className="w-full max-w-5xl mt-6 p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 text-white flex justify-between items-center">

      {/* Left Content */}
      <div>
        <h2 className="text-4xl font-bold">{weather.name}</h2>

        <p className="text-7xl mt-4">
          {weather.temp}°C
        </p>

        <p className="text-3xl mt-2">
          {weather.weatherText}
        </p>

        <div className="mt-6 space-y-3 text-xl">
          <p>💨 Wind: {weather.wind} km/h</p>
          <p>💧 Humidity: {weather.humidity}%</p>
        </div>
      </div>

    {/* Right Weather Icon */}
    <div className="w-[280px] h-[280px] flex items-center justify-center">
    <i
        className={`wi ${getWeatherIconClass(
        weather.code
        )} text-[180px] text-cyan-300`}
    ></i>
    </div>

    </div>
  );
}

export default WeatherCard;