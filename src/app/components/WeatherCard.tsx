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
    <div className="w-full p-6 bg-foreground rounded-xl shadow-lg">
      <div className="flex flex-start w-full mb-2">
        <h2 className="text-2xl font-bold text-background">{data.name}</h2>
      </div>

      <div className="flex flex-start items-center w-full mb-4">
        <Image
          src={iconUrl}
          width={80}
          height={80}
          alt="Weather icon"
          className="w-20 h-20"
        />
        <p className="text-6xl ml-4 text-background">
          {data.main.temp.toFixed(0)}°C
        </p>
      </div>

      <div className="flex flex-start items-center w-full mb-6">
        <p className="text-background">
          Feels like {data.main.feels_like.toFixed(0)}ºC and{" "}
          {data.weather[0].description}.
        </p>
      </div>

      <div className="flex flex-row justify-around items-center w-full mb-6">
        <div className="flex-1 text-center">
          <div className="flex flex-row justify-center items-center text-background text-xl md:text-2xl">
            <CarbonHumidity className="w-fit h-fit hidden md:block mr-1" />
            {data.main.humidity}%
          </div>
          <p className="text-sm text-background mt-2">Humidity</p>
        </div>

        <div className="flex-1 text-center">
          <div className="flex flex-row justify-center items-center text-background text-xl md:text-2xl gap-2">
            <SolarWindBold className="w-fit h-fit hidden md:block" />
            {data.wind.speed} m/s
          </div>
          <p className="text-sm text-background mt-2">Wind</p>
        </div>

        <div className="flex-1 text-center">
          <div className="flex flex-row justify-center items-center text-background text-xl md:text-2xl gap-2">
            <LetsIconsPressure className="w-fit h-fit hidden md:block" />
            {data.main.pressure} hPa
          </div>
          <p className="text-sm text-background mt-2">Pressure</p>
        </div>
      </div>

      <div className="flex flex-start items-center w-full">
        <p className="font-bold text-background">Today&apos;s Weather</p>
      </div>
    </div>
  );
}
