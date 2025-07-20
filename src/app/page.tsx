import { PiSunHorizonDuotone } from "react-icons/pi";
import { getWeatherByCity, getForecastByCity } from "./lib/fetchWeathers";
import WeatherSlider from "./components/WeatherSlider";
import SearchBar from "./components/SearchBar";

interface Props {
  searchParams: Promise<{ city?: string }>;
}

export default async function ResponsiveWeatherApp({ searchParams }: Props) {
  const { city } = await searchParams;
  const cityName = city ?? "Madrid";

  let weatherData = null;
  let forecastData = null;
  let error = null;

  try {
    // Obtener ambos datos en paralelo
    const [weatherResult, forecastResult] = await Promise.allSettled([
      getWeatherByCity(cityName),
      getForecastByCity(cityName),
    ]);

    if (weatherResult.status === "fulfilled") {
      weatherData = weatherResult.value;
    } else {
      throw weatherResult.reason;
    }

    if (forecastResult.status === "fulfilled") {
      forecastData = forecastResult.value;
    } else {
      console.warn("Forecast data failed to load:", forecastResult.reason);
    }
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
        <WeatherSlider
          weatherData={weatherData}
          forecastData={forecastData}
          error={error}
        />
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
