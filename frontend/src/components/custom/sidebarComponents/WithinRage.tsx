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
        alert(
          "Unable to fetch your location. Please enable location."
        );
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
    <div className="p-4 w-80 border rounded-md shadow-md">
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-lg font-semibold mb-3">Distance Range</h1>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-blue-500 text-sm underline focus:outline-none"
        >
          {isCollapsed ? "Show" : "Collapse"}
        </button>
      </div>
      {isCollapsed && (
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="form-checkbox h-4 w-4 text-blue-600"
              checked={selectedRanges.includes("Within 10 Km")}
              onChange={() => handleCheckboxChange("Within 10 Km")}
            />
            <span>Within 10 Km</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="form-checkbox h-4 w-4 text-blue-600"
              checked={selectedRanges.includes("Within 20 Km")}
              onChange={() => handleCheckboxChange("Within 20 Km")}
            />
            <span>Within 20 Km</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="form-checkbox h-4 w-4 text-blue-600"
              checked={selectedRanges.includes("Within 30 Km")}
              onChange={() => handleCheckboxChange("Within 30 Km")}
            />
            <span>Within 30 Km</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="form-checkbox h-4 w-4 text-blue-600"
              checked={selectedRanges.includes("Within 50 Km")}
              onChange={() => handleCheckboxChange("Within 50 Km")}
            />
            <span>Within 50 Km</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="form-checkbox h-4 w-4 text-blue-600"
              checked={selectedRanges.includes("Within 250 Km")}
              onChange={() => handleCheckboxChange("Within 250 Km")}
            />
            <span>Within 250 Km</span>
          </label>
        </div>
      )}
      {/* {coordinates && (
        <div className="mt-4 text-sm text-gray-700">
          <p>
            <strong>Coordinates:</strong> Latitude: {coordinates.lat},
            Longitude: {coordinates.lng}
          </p>
        </div>
      )} */}
    </div>
  );
}