import { PiSunHorizonDuotone } from "react-icons/pi";
import { BiSearchAlt } from "react-icons/bi";
import { getWeatherByCity } from "./lib/fetchWeathers";
import WeatherCard from "./components/WeatherCard";
import SearchBar from "./components/SearchBar";

interface Props {
  searchParams: { city?: string };
}

export default async function ResponsiveWeatherApp({ searchParams }: Props) {
  const city = searchParams.city ?? "Madrid";
  const data = await getWeatherByCity(city);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full px-4 py-6">
      <header className="flex flex-col items-center justify-center w-full max-w-2xl mb-8 h-[25vh]">
        <div className="flex flex-row items-center justify-center gap-4 sm:gap-8 mb-4 w-full">
          <PiSunHorizonDuotone className="text-6xl sm:text-8xl" />
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Weather App
          </h1>
        </div>
        <div className="flex flex-row items-center justify-center w-full mt-4 gap-2 sm:gap-4">
          <SearchBar />
        </div>
      </header>

      <main className="flex flex-col items-center justify-center flex-1 w-full h-[65vh] max-w-4xl px-4">
        <div className="w-full h-64 sm:h-80 rounded-lg shadow-lg flex items-center justify-center bg-foreground border-cyan-800 border-solid border-2 ">
          <WeatherCard data={data} />
        </div>
      </main>

      <footer className="mt-8 w-full max-w-2xl h[15vh]">
        <div className="flex flex-col items-center justify-center gap-3 text-center">
          <p className="text-sm sm:text-base">Powered by OpenWeatherMap</p>
          <p className="text-sm sm:text-lg font-bold px-4">
            Copyright © 2025, All Rights Reserved to Juan Manuel López Arrieta
          </p>
        </div>
      </footer>
    </div>
  );
}
