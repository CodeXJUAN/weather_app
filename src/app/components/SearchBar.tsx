"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
  const [city, setCity] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!city.trim()) return;
    router.push(`/?city=${encodeURIComponent(city)}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex justify-center mt-10">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Search city…"
        className="border rounded-l px-4 py-2 focus:outline-none"
      />
      <button
        type="submit"
        className="bg-sky-600 text-white rounded-r px-4 py-2"
      >
        Go
      </button>
    </form>
  );
}
