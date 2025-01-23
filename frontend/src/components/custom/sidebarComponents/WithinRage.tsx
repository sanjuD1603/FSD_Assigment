"use client";

import { filterAtom } from "@/lib/store/filterAndSort";
import { useSetAtom } from "jotai";
import { useState, useEffect } from "react";

export default function WithinRange() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [selectedRanges, setSelectedRanges] = useState<string[]>([""]);
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const setFilter = useSetAtom(filterAtom);

  const fetchCoordinates = () => {
    if (!navigator.geolocation) {
      alert("Allow location in browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCoordinates({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.log(error);
      }
    );
  };

  useEffect(() => {
    if (coordinates) {
      const coordinatesArray: [number, number] = [
        coordinates.lat,
        coordinates.lng,
      ];

      let maxDistance: number | undefined;
      if (selectedRanges.includes("Within 10 Km")) {
        maxDistance = 10;
      } else if (selectedRanges.includes("Within 20 Km")) {
        maxDistance = 20;
      } else if (selectedRanges.includes("Within 30 Km")) {
        maxDistance = 30;
      } else if (selectedRanges.includes("Within 50 Km")) {
        maxDistance = 50;
      } else if (selectedRanges.includes("Within 250 Km")) {
        maxDistance = 250;
      }

      setFilter((prev) => ({
        ...prev,
        maxDistance: maxDistance,
        coordinates: coordinatesArray,
      }));
    }
  }, [selectedRanges, coordinates, setFilter]);

  const handleCheckboxChange = (rangeType: string) => {
    if (!coordinates) {
      fetchCoordinates();
      return;
    }

    if (rangeType === "Any") {
      setSelectedRanges(["Any"]);
    } else {
      const updatedSelectedRanges = selectedRanges.includes(rangeType)
        ? selectedRanges.filter((type) => type !== rangeType)
        : [...selectedRanges.filter((type) => type !== "Any"), rangeType];

      setSelectedRanges(updatedSelectedRanges);
    }
  };

  return (
    <div className="p-4 w-80 border rounded-md shadow-lg hover:shadow-xl">
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-lg font-semibold mb-3">Distance Range</h1>

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-[#1D506A] text-sm underline focus:outline-none"
        >
          <svg
            fill="#1D506A"
            height="20px"
            width="20px"
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 330 330"
            xmlSpace="preserve"
            className={`transform transition-transform duration-300 ${
              isCollapsed ? "rotate-0" : "rotate-180"
            }`}
          >
            <g id="SVGRepo_iconCarrier">
              <path
                id="XMLID_225_"
                d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393 c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393 s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"
              ></path>
            </g>
          </svg>
        </button>
      </div>
      <hr className="my-2" />
      {isCollapsed && (
        <div className="space-y-2">
          {[
            "Within 10 Km",
            "Within 20 Km",
            "Within 30 Km",
            "Within 50 Km",
            "Within 250 Km",
          ].map((range) => (
            <label key={range} className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="peer hidden"
                checked={selectedRanges.includes(range)}
                onChange={() => handleCheckboxChange(range)}
              />
              <span className="w-5 h-5 border border-[#1D506A] rounded-sm flex items-center justify-center peer-checked:bg-[#1D506A] peer-checked:border-[#1D506A]">
                {selectedRanges.includes(range) && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 14.707a1 1 0 01-1.414 0l-3-3a1 1 0 011.414-1.414L10 12.586l7.293-7.293a1 1 0 011.414 1.414l-8 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </span>
              <span>{range}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
