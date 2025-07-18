"use client";

import type { WeatherData } from "./../types/weatherData";
import Image from "next/image";

interface Props {
  data: WeatherData;
}

export default function WeatherCard({ data }: Props) {
  const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-2">{data.name}</h2>
      <div className="flex items-center">
        <Image src={iconUrl} width={80} height={80} alt="icon" />
        <p className="text-4xl ml-4">{data.main.temp.toFixed(0)}°C</p>
      </div>
      <p className="capitalize">{data.weather[0].description}</p>
      <p className="text-sm text-gray-600 mt-2">
        Humidity: {data.main.humidity}% — Wind: {data.wind.speed} m/s
      </p>
    </div>
  );
}
