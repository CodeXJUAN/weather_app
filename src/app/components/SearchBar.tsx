"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";

export default function SearchBar() {
  const [city, setCity] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!city.trim()) return;
    router.push(`/?city=${encodeURIComponent(city)}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex justify-center gap-4">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Search city…"
        className="flex-1 max-w-sm px-4 py-3 text-sm sm:text-base border-2 border-gray-300 rounded-full shadow-lg focus:outline-none focus:border-teal-500 focus:shadow-xl transition-all duration-300 placeholder-gray-400"
      />
      <button
        type="submit"
        className="w-12 h-12 rounded-full flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all duration-300"
      >
        <BiSearchAlt className="text-2xl" />
      </button>
    </form>
  );
}
