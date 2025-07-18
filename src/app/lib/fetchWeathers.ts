import type { WeatherData } from "./../types/weatherData";

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_KEY!;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export async function getWeatherByCity(city: string): Promise<WeatherData> {
  const res = await fetch(
    `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`,
    {
      next: { revalidate: 60 }, // ISR cache 60 s
    },
  );

  if (!res.ok) throw new Error("City not found");
  return res.json();
}
