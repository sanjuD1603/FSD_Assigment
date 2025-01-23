"use client";

import { filterAtom } from "@/lib/store/filterAndSort";
import { useAtom } from "jotai";
import React from "react";


export default function Warranty() {
  const [filter, setFilter] = useAtom(filterAtom); 
  const warrantyOptions = [
    "3 months",
    "6 months",
    "1 year",
    "2 years",
    "3 years",
  ];

  const handleCheckboxChange = (warrantyType: string) => {
    if (warrantyType === "Any") {
      setFilter((prev) => ({
        ...prev,
        warranty: [], 
      }));
    } else {
      const isSelected = filter.warranty?.includes(warrantyType);
      setFilter((prev) => ({
        ...prev,
        warranty: isSelected
          ? filter.warranty?.filter((type) => type !== warrantyType) 
          : [...(filter.warranty || []), warrantyType], 
      }));
    }
    
  };

  return (
    <div className="p-4 w-80 border rounded-md shadow-lg hover:shadow-xl transition-shadow duration-300">
      <h1 className="text-lg font-semibold mb-3">Warranty</h1>
      <div className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar">
        
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="peer hidden"
            checked={filter.warranty?.length === 0} 
            onChange={() => handleCheckboxChange("Any")}
          />
          <span className="w-5 h-5 border border-[#1D506A] rounded-sm flex items-center justify-center peer-checked:bg-[#1D506A] peer-checked:border-[#1D506A]">
            {filter.warranty?.length === 0 && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-white"
                viewBox="0 0 24 24"
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
          <span>Any</span>
        </label>
        <hr className="my-2" />

       
        {warrantyOptions.map((warranty) => (
          <label key={warranty} className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="peer hidden"
              checked={filter.warranty?.includes(warranty)} 
              onChange={() => handleCheckboxChange(warranty)}
            />
            <span className="w-5 h-5 border border-[#1D506A] rounded-sm flex items-center justify-center peer-checked:bg-[#1D506A] peer-checked:border-[#1D506A]">
              {filter.warranty?.includes(warranty) && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 text-white"
                  viewBox="0 0 24 24"
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
            <span>{warranty}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
