"use client";

import { filterAtom } from "@/lib/store/filterAndSort";
import { useSetAtom } from "jotai";
import { useState, useEffect } from "react";


export default function Verification() {
  const [selectedOption, setSelectedOption] = useState<string>("Any");
  const setFilter = useSetAtom(filterAtom);

  useEffect(() => {
    setFilter((prev) => ({
      ...prev,
      verified: selectedOption === "Any" ? "" : true,
    }));
    
  }, [selectedOption, setFilter]);

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <div className="p-4 w-80 border rounded-md shadow-md">
      <h1 className="text-lg font-semibold mb-3">Verification</h1>
      <div className="space-y-2">
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            className="form-radio h-4 w-4"
            name="verification"
            value="Any"
            checked={selectedOption === "Any"}
            onChange={() => handleOptionChange("Any")}
            style={{
              accentColor: "#1D506A",
            }}
          />
          <span>Any</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            className="form-radio h-4 w-4"
            name="verification"
            value="Verified Only"
            checked={selectedOption === "Verified Only"}
            onChange={() => handleOptionChange("Verified Only")}
            style={{
              accentColor: "#1D506A",
            }}
          />
          <span>Verified Only</span>
        </label>
      </div>
    </div>
  );
}
