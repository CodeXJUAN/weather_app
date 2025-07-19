import { PiSunHorizonDuotone } from "react-icons/pi";
import { getWeatherByCity } from "./lib/fetchWeathers";
import WeatherCard from "./components/WeatherCard";
import SearchBar from "./components/SearchBar";

interface Props {
  searchParams: Promise<{ city?: string }>;
}

export default async function ResponsiveWeatherApp({ searchParams }: Props) {
  const { city } = await searchParams;
  const cityName = city ?? "Madrid";

  let data = null;
  let error = null;

  try {
    data = await getWeatherByCity(cityName);
  } catch (err) {
    error = err instanceof Error ? err.message : "Error fetching weather data";
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full px-4 py-6">
      <header className="flex flex-col items-center justify-center w-full mb-8 h-[25vh]">
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

      <main className="flex-1 flex items-center justify-center px-4 py-6 sm:py-8 w-full mb-8 h-[60vh]">
        <div className="w-full max-w-lg min-h-fit">
          {error ? (
            <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
              <div className="text-red-500 mb-4">
                <svg
                  className="w-12 h-12 mx-auto mb-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-lg font-bold text-gray-800">Error</p>
              </div>
              <p className="text-sm text-gray-600 mb-2">{error}</p>
              <p className="text-xs text-gray-500">
                Please try searching for another city
              </p>
            </div>
          ) : data ? (
            <WeatherCard data={data} />
          ) : (
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading weather data...</p>
            </div>
          )}
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
