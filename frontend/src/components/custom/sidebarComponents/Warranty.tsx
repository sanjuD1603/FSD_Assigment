"use client";

import { filterAtom } from "@/lib/store/filterAndSort";
import { useSetAtom } from "jotai";
import { useState, useEffect } from "react";

export default function Warranty() {
  const [selectedWarranty, setSelectedWarranty] = useState<string[]>(["Any"]);
  const setFilter = useSetAtom(filterAtom);

  
  useEffect(() => {
    if (selectedWarranty.includes("Any")) {
      setFilter((prev) => ({
        ...prev,
        warranty: [], 
      }));
    } else {
      setFilter((prev) => ({
        ...prev,
        warranty: selectedWarranty,
      }));
    }
  }, [selectedWarranty, setFilter]);

  const handleCheckboxChange = (warrantyType: string) => {
    if (warrantyType === "Any") {
    
      setSelectedWarranty(["Any"]);
    } else {
      
      const updatedSelectedWarranty = selectedWarranty.includes(warrantyType)
        ? selectedWarranty.filter((type) => type !== warrantyType) 
        : [...selectedWarranty.filter((type) => type !== "Any"), warrantyType]; 

      setSelectedWarranty(updatedSelectedWarranty);
    }
  };

  return (
    <div className="p-4 w-80 border rounded-md shadow-md">
      <h1 className="text-lg font-semibold mb-3">Warranty</h1>
      <div className="space-y-2">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="form-checkbox h-4 w-4 text-blue-600"
            checked={selectedWarranty.includes("Any")}
            onChange={() => handleCheckboxChange("Any")}
          />
          <span>Any</span>
        </label>
        <hr className="my-2" />
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="form-checkbox h-4 w-4 text-blue-600"
            checked={selectedWarranty.includes("3 months")}
            onChange={() => handleCheckboxChange("3 months")}
          />
          <span>3 months</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="form-checkbox h-4 w-4 text-blue-600"
            checked={selectedWarranty.includes("6 months")}
            onChange={() => handleCheckboxChange("6 months")}
          />
          <span>6 months</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="form-checkbox h-4 w-4 text-blue-600"
            checked={selectedWarranty.includes("1 year")}
            onChange={() => handleCheckboxChange("1 year")}
          />
          <span>1 year</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="form-checkbox h-4 w-4 text-blue-600"
            checked={selectedWarranty.includes("2 years")}
            onChange={() => handleCheckboxChange("2 years")}
          />
          <span>2 years</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="form-checkbox h-4 w-4 text-blue-600"
            checked={selectedWarranty.includes("3 years")}
            onChange={() => handleCheckboxChange("3 years")}
          />
          <span>3 years</span>
        </label>
      </div>
    </div>
  );
}
