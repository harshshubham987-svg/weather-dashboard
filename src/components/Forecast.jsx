import { useRef } from "react";
import { getWeatherIconClass } from "../services/weatherApi";

function Forecast({ forecast, selectedDay, setSelectedDay }) {
  const scrollRef = useRef();

  if (!forecast) return null;

  const { daily } = forecast;

  const scrollLeft = () => {
    scrollRef.current.scrollBy({
      left: -250,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({
      left: 250,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full max-w-7xl mt-6 relative px-10">
      <h2 className="text-white text-2xl font-bold mb-6">
        12-Day Forecast
      </h2>

      <button
        onClick={scrollLeft}
        className="absolute left-0 top-[60%] z-20"
      >
        ←
      </button>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide"
      >
        {daily.time.map((day, index) => (
          <div
            key={index}
            onClick={() => setSelectedDay(index)}
            className={`min-w-[170px] p-5 rounded-3xl cursor-pointer transition-all ${
              selectedDay === index
                ? "bg-cyan-500/20 border-cyan-400"
                : "bg-white/10 border-white/20"
            } border backdrop-blur-xl text-white`}
          >
            <div className="flex flex-col items-center">

            {/* Date */}
            <h3 className="text-4xl font-bold leading-none">
                {new Date(day).getDate()}
            </h3>

            {/* Today Label */}
            {index === 0 ? (
                <p className="text-xs text-cyan-300 mt-2 uppercase tracking-wider">
                Today
                </p>
            ) : null}

            {/* Day */}
            <p className="text-sm text-gray-300 mt-1">
                {new Date(day).toLocaleDateString("en-US", {
                weekday: "short",
                })}
            </p>

            {/* Icon */}
            <div className="text-5xl my-4">
                <i
                    className={`wi ${getWeatherIconClass(
                    daily.weathercode[index]
                    )}`}
                ></i>
            </div>

            {/* Temperature */}
            <p className="text-xl font-semibold">
                {daily.temperature_2m_max[index]}°
            </p>

            <p className="text-gray-400">
                {daily.temperature_2m_min[index]}°
            </p>

            </div>
          </div>
        ))}
      </div>

      <button
        onClick={scrollRight}
        className="absolute right-0 top-[60%] z-20"
      >
        →
      </button>
    </div>
  );
}

export default Forecast;