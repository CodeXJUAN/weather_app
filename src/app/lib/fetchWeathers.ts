import type { WeatherData } from "./../types/weatherData";

const API_KEY = process.env.API_KEY_WEATHER!;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export async function getWeatherByCity(city: string): Promise<WeatherData> {
  try {
    const res = await fetch(
      `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`,
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
