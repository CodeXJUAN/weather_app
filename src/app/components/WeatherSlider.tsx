"use client";
import { useState, useRef, useEffect } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { TiWeatherPartlySunny } from "react-icons/ti";
import type { WeatherData, ForecastData } from "./../types/weatherData";
import WeatherCard from "./WeatherCard";
import ForecastCard from "./ForecastCard";

interface Props {
  weatherData: WeatherData | null;
  forecastData: ForecastData | null;
  error: string | null;
}

export default function WeatherSlider({
  weatherData,
  forecastData,
  error,
}: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const slides = [
    {
      id: "current",
      title: "Current Weather",
      icon: <TiWeatherPartlySunny className="w-5 h-5" />,
    },
    {
      id: "forecast",
      title: "5-Day Forecast",
      icon: <HiOutlineDotsHorizontal className="w-5 h-5" />,
    },
  ];

  const nextSlide = () => {
    if (!isAnimating && currentIndex < slides.length - 1) {
      setIsAnimating(true);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (!isAnimating && currentIndex > 0) {
      setIsAnimating(true);
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToSlide = (index: number) => {
    if (!isAnimating && index !== currentIndex) {
      setIsAnimating(true);
      setCurrentIndex(index);
    }
  };

  // Handle touch events for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeThreshold = 50;
    const swipeDistance = touchStartX.current - touchEndX.current;

    if (Math.abs(swipeDistance) > swipeThreshold) {
      if (swipeDistance > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  };

  // Reset animation state
  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 300);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  if (error) {
    return (
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
    );
  }

  if (!weatherData || !forecastData) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading weather data...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Navigation Header */}
      <div className="flex items-center justify-between mb-4 px-2">
        <button
          onClick={prevSlide}
          disabled={currentIndex === 0 || isAnimating}
          className={`p-2 rounded-full transition-all duration-200 ${
            currentIndex === 0
              ? "text-gray-400 cursor-not-allowed"
              : "text-gray-600 hover:bg-gray-100 hover:text-gray-800 active:scale-95"
          }`}
        >
          <BsChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          {slides[currentIndex].icon}
          <span className="font-semibold text-foreground">
            {slides[currentIndex].title}
          </span>
        </div>

        <button
          onClick={nextSlide}
          disabled={currentIndex === slides.length - 1 || isAnimating}
          className={`p-2 rounded-full transition-all duration-200 ${
            currentIndex === slides.length - 1
              ? "text-gray-400 cursor-not-allowed"
              : "text-gray-600 hover:bg-gray-100 hover:text-gray-800 active:scale-95"
          }`}
        >
          <BsChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Slider Container */}
      <div className="relative overflow-hidden rounded-xl">
        <div
          className={`flex transition-transform duration-300 ease-in-out ${
            isAnimating ? "transform" : ""
          }`}
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Current Weather Slide */}
          <div className="w-full flex-shrink-0">
            <div className="min-h-fit">
              <WeatherCard data={weatherData} />
            </div>
          </div>

          {/* Forecast Slide */}
          <div className="w-full flex-shrink-0">
            <div className="min-h-fit">
              <ForecastCard data={forecastData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
