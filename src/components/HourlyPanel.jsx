import { getWeatherIcon } from "../services/weatherApi";

function HourlyPanel({ forecast, selectedDay }) {
  if (!forecast) return null;

  const start = selectedDay * 24;
  const end = start + 24;

  const hours = forecast.hourly.time.slice(start, end);
  const temps = forecast.hourly.temperature_2m.slice(start, end);
  const codes = forecast.hourly.weathercode.slice(start, end);

  return (
    <div className="w-full max-w-6xl mt-8 p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 text-white">
      <h2 className="text-2xl font-bold mb-4">
        Hourly Forecast
      </h2>

      <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
        {hours.map((hour, index) => (
          <div key={index} className="text-center">
            <p>
              {new Date(hour).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>

            <div className="text-3xl my-2">
              {getWeatherIcon(codes[index])}
            </div>

            <p>{temps[index]}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HourlyPanel;