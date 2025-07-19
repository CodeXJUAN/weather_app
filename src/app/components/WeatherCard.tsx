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
      <div className="flex flex-start w-full h-[10%]">
        <h2 className="text-2xl font-bold mb-2 text-background">{data.name}</h2>
      </div>
      <div className="flex flex-start items-center w-full h-[35%] mb-4">
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
      <div className="flex flex-start items-center w-full h-[10%]">
        <p className="text-background">
          Feels like {data.main.feels_like.toFixed(0)}ºC and{" "}
          {data.weather[0].description}.
        </p>
      </div>
      <div className="flex flex-row justify-around items-center w-full h-[35%] mt-6 mb-6">
        <div className="w-1/3">
          <div className="flex flex-row justify-center items-center text-background text-xl md:text-2xl">
            <CarbonHumidity className="w-fit h-fit hidden md:block" />
            {data.main.humidity}%
          </div>
          <p className="text-sm text-background mt-2 text-center">Humidity</p>
        </div>
        <div className="w-1/3">
          <div className="flex flex-row justify-center items-center text-background text-xl md:text-2xl gap-2">
            <SolarWindBold className="w-fit h-fit hidden md:block" />
            {data.wind.speed} m/s
          </div>
          <p className="text-sm text-center text-background mt-2 ">Wind</p>
        </div>
        <div className="w-1/3">
          <div className="flex flex-row justify-center items-center text-background text-xl md:text-2xl gap-2">
            <LetsIconsPressure className="w-fit h-fit hidden md:block" />
            {data.main.pressure} hPa
          </div>
          <p className="text-sm text-center text-background mt-2 ">Pressure</p>
        </div>
      </div>
      <div className="flex flex-start items-center w-full h-[10%]">
        <p className="font-bold text-background">Today&apos;s Forecast</p>
      </div>
    </div>
  );
}
