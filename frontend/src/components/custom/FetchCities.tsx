"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import responses from "@/assets/responses/response.json";
import { useSetAtom } from "jotai";
import { filterAtom } from "@/lib/store/filterAndSort";
import Image from "next/image";

interface FetchCitiesProps {
  onClose: () => void;
}

type City = {
  type: string;
  id: number;
  location: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
  imgPath: string;
};

const FetchCities: React.FC<FetchCitiesProps> = ({ onClose }) => {
  const [selectedCity, setSelectedCity] = useState<{
    state: string;
    city: string;
  } | null>(null);
  const setFilter = useSetAtom(filterAtom);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = useCallback(
    (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [handleOutsideClick]);

  useEffect(() => {
    if (selectedCity) {
      setFilter((prev) => ({
        ...prev,
        listingState: selectedCity.state,
      }));
      onClose();
    }
  }, [selectedCity, setFilter, onClose]);

  const handleCitySelection = (city: City) => {
    setSelectedCity({ state: city.state, city: city.city });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        ref={modalRef}
        className="relative flex flex-col items-center bg-white rounded-lg shadow-lg max-w-4xl w-full mx-4 sm:mx-6 lg:mx-auto overflow-hidden"
      >
        <div className="p-6 w-full max-h-screen overflow-y-auto">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 text-center">
            Select Your Location
          </h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 w-full">
            {responses.map((city) => (
              <div
                key={city.id}
                onClick={() => handleCitySelection(city)}
                className="flex flex-col items-center p-4 bg-gray-100 shadow-lg rounded-lg hover:shadow-2xl transform hover:scale-105 transition-all cursor-pointer"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 mb-4">
                  <Image
                    src={city.imgPath}
                    alt={city.city}
                    width={80}
                    height={80}
                    className="rounded-full object-cover"
                  />
                </div>
                <h2 className="text-sm sm:text-lg font-semibold text-gray-800">
                  {city.city}
                </h2>
                <p className="text-xs sm:text-sm text-gray-500">{city.state}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(FetchCities);
