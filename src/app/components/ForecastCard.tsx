"use client";
import type { ForecastData } from "./../types/weatherData";
import Image from "next/image";

interface Props {
  data: ForecastData;
}

interface DailyForecast {
  date: string;
  dayName: string;
  temp_min: number;
  temp_max: number;
  icon: string;
  description: string;
  temps: number[];
}

interface DailyData {
  [key: string]: {
    date: string;
    dayName: string;
    temp_min: number;
    temp_max: number;
    icon: string;
    description: string;
    temps: number[];
  };
}

export default function ForecastCard({ data }: Props) {
  // Procesar datos para obtener forecast diario
  const processDailyForecast = (): DailyForecast[] => {
    const dailyData: DailyData = {};

    data.list.forEach((item) => {
      const date = new Date(item.dt * 1000);
      const dateKey = date.toISOString().split("T")[0];

      if (!dailyData[dateKey]) {
        dailyData[dateKey] = {
          date: dateKey,
          dayName: date.toLocaleDateString("en-US", { weekday: "short" }),
          temp_min: item.main.temp_min,
          temp_max: item.main.temp_max,
          icon: item.weather[0].icon,
          description: item.weather[0].description,
          temps: [item.main.temp],
        };
      } else {
        dailyData[dateKey].temp_min = Math.min(
          dailyData[dateKey].temp_min,
          item.main.temp_min,
        );
        dailyData[dateKey].temp_max = Math.max(
          dailyData[dateKey].temp_max,
          item.main.temp_max,
        );
        dailyData[dateKey].temps.push(item.main.temp);
      }
    });

    return Object.values(dailyData).slice(0, 5);
  };

  const dailyForecast = processDailyForecast();

  return (
    <div className="w-full p-6 bg-foreground rounded-xl shadow-lg">
      <div className="flex flex-start w-full mb-4">
        <h2 className="text-2xl font-bold text-background">{data.city.name}</h2>
      </div>

      <div className="flex flex-start items-center w-full mb-6">
        <p className="font-bold text-background text-lg">5-Day Forecast</p>
      </div>

      <div className="flex flex-col gap-3 w-full mb-4">
        {dailyForecast.map((day, index) => (
          <div
            key={day.date}
            className="flex items-center justify-between bg-background/10 rounded-lg p-3 backdrop-blur-sm"
          >
            <div className="flex items-center gap-3 flex-1">
              <div className="w-16 text-center">
                <p className="text-background font-semibold text-sm">
                  {index === 0 ? "Today" : day.dayName}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Image
                  src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                  width={40}
                  height={40}
                  alt="Weather icon"
                  className="w-10 h-10"
                />
                <p className="text-background text-sm capitalize hidden sm:block">
                  {day.description}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-background font-bold text-lg">
                {day.temp_max.toFixed(0)}°
              </span>
              <span className="text-background/70 text-base">
                {day.temp_min.toFixed(0)}°
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center w-full">
        <p className="text-background/70 text-xs">
          Swipe to see current weather →
        </p>
      </div>
    </div>
  );
}
