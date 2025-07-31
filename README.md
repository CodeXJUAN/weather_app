# Weather App

A modern, responsive weather application built with Next.js that provides current weather information and 5-day forecasts for cities worldwide.

## Features

- **Current Weather**: Real-time weather data including temperature, humidity, wind speed, and atmospheric pressure
- **5-Day Forecast**: Extended weather forecast with daily temperature ranges and weather conditions
- **Interactive Slider**: Swipe between current weather and forecast views on mobile devices
- **City Search**: Search for weather information in any city globally
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Mode**: Automatic theme switching based on system preferences
- **Modern UI**: Clean, intuitive interface with smooth animations and transitions

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org) with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom CSS variables
- **Icons**: React Icons, Lucide React
- **Fonts**: [Onest](https://fonts.google.com/specimen/Onest) from Google Fonts
- **API**: [OpenWeatherMap API](https://openweathermap.org/api)

## Project Structure

```
src/app/
├── components/
│   ├── ForecastCard.tsx      # 5-day forecast display component
│   ├── SearchBar.tsx         # City search input component
│   ├── WeatherCard.tsx       # Current weather display component
│   ├── WeatherSlider.tsx     # Main slider container component
│   └── icons/                # Custom SVG icon components
│       ├── HumidityIcon.tsx
│       ├── PressureIcon.tsx
│       └── WindIcon.tsx
├── lib/
│   └── fetchWeathers.ts      # API functions for weather data
├── types/
│   └── weatherData.ts        # TypeScript type definitions
├── globals.css               # Global styles and CSS variables
├── layout.tsx               # Root layout component
└── page.tsx                 # Main page component
```

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm, yarn, pnpm, or bun
- OpenWeatherMap API key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd weather-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Create a `.env.local` file in the root directory and add your OpenWeatherMap API key:
```env
API_KEY_WEATHER=your_api_key_here
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Getting an API Key

1. Sign up at [OpenWeatherMap](https://openweathermap.org/api)
2. Subscribe to the free tier (1,000 calls/day)
3. Generate an API key from your account dashboard
4. Add the key to your `.env.local` file

## Usage

- **Search**: Enter a city name in the search bar and press Enter or click the search button
- **Navigation**: Use the arrow buttons or swipe on mobile to switch between current weather and forecast views
- **Default City**: The app loads Madrid weather by default if no city is specified

## API Integration

The app uses two OpenWeatherMap API endpoints:

- **Current Weather**: `/data/2.5/weather` - Provides current weather conditions
- **5-Day Forecast**: `/data/2.5/forecast` - Provides weather forecast data

Both endpoints use:
- Metric units for temperature (Celsius)
- 60-second cache for current weather (ISR)
- 5-minute cache for forecast data (ISR)

## Responsive Design

The application is fully responsive with:
- Mobile-first design approach
- Touch gestures for navigation on mobile devices
- Adaptive layouts for different screen sizes
- Optimized typography and spacing

## Theme Support

Automatic theme switching based on system preferences:
- **Light Mode**: Light blue background (#b9c7ca) with dark text (#132428)
- **Dark Mode**: Dark background (#132428) with light text (#b9c7ca)

## Performance Features

- **Incremental Static Regeneration (ISR)**: Cached weather data with automatic revalidation
- **Parallel Data Fetching**: Weather and forecast data loaded simultaneously
- **Image Optimization**: Next.js Image component for weather icons
- **Bundle Optimization**: Automatic code splitting and optimization

## License

Copyright © 2025, All Rights Reserved to Juan Manuel López Arrieta

## Acknowledgments

- Weather data provided by [OpenWeatherMap](https://openweathermap.org)
- Icons from [React Icons](https://react-icons.github.io/react-icons/)
- Built with [Next.js](https://nextjs.org) and [Tailwind CSS](https://tailwindcss.com)
