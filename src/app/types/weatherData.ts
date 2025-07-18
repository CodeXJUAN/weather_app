export interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    dew_point: number;
    visibility: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
}
