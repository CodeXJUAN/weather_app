"use client";

import type { WeatherData } from "./../types/weatherData";
import Image from "next/image";
import { LetsIconsPressure } from "./icons/PressureIcon";
import { SolarWindBold } from "./icons/WindIcon";
import { CarbonHumidity } from "./icons/HumidityIcon";

interface Props {
  data: WeatherData;
}

export default function WeatherCard({ data }: Props) {
  const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  return (
    <div className="w-full h-full p-6 bg-foreground rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-2 text-background">{data.name}</h2>
      <div className="flex items-center">
        <Image
          src={iconUrl}
          width={80}
          height={80}
          alt="Weather icon"
          className="w-20 h-20"
        />
        <p className="text-4xl ml-4 text-background">
          {data.main.temp.toFixed(0)}°C
        </p>
      </div>
      <div>
        <p className="text-background">
          Feels like {data.main.feels_like.toFixed(0)}ºC and{" "}
          {data.weather[0].description}.
        </p>
      </div>
      <div className="flex flex-row justify-around items-center">
        <div>
          <div className="flex flex-row justify-center items-center text-background text-2xl">
            <CarbonHumidity />
            {data.main.humidity}%
          </div>
          <p className="text-sm text-background mt-2 text-center">Humidity</p>
        </div>
        <div>
          <div className="flex flex-row justify-center items-center text-background text-2xl gap-2">
            <SolarWindBold />
            {data.wind.speed} m/s
          </div>
          <p className="text-sm text-center text-background mt-2 ">Wind</p>
        </div>
        <div>
          <div className="flex flex-row justify-center items-center text-background text-2xl gap-2">
            <LetsIconsPressure />
            {data.main.pressure} hPa
          </div>
          <p className="text-sm text-center text-background mt-2 ">Pressure</p>
        </div>
      </div>
      <div className="flex flex-start">
        <p className="font-bold text-background">Today&apos;s Forecast</p>
      </div>
    </div>
  );
}
