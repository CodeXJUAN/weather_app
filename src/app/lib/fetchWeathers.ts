import type { WeatherData, ForecastData } from "./../types/weatherData";

const API_KEY = process.env.API_KEY_WEATHER!;
const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";

export async function getWeatherByCity(city: string): Promise<WeatherData> {
  try {
    const res = await fetch(
      `${WEATHER_URL}?q=${city}&appid=${API_KEY}&units=metric`,
      {
        next: { revalidate: 60 }, // ISR cache 60 s
      },
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "City not found");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
}

export async function getForecastByCity(city: string): Promise<ForecastData> {
  try {
    const res = await fetch(
      `${FORECAST_URL}?q=${city}&appid=${API_KEY}&units=metric&cnt=40`, // 5 days, 8 times per day
      {
        next: { revalidate: 300 }, // ISR cache 5 minutes
      },
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "City not found");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching forecast data:", error);
    throw error;
  }
}
