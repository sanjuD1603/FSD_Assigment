"use client";

import React, { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { filterAtom } from "@/lib/store/filterAndSort";
import { useSetAtom } from "jotai";

const Price: React.FC = () => {
  const [priceRange, setPriceRange] = useState<[number, number]>([
    2000, 200000,
  ]);
  const setFilter = useSetAtom(filterAtom);

  useEffect(() => {
    setFilter((prev) => ({
      ...prev,
      priceRange,
    }));
  }, [priceRange, setFilter]);

  const handleSliderChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
  };

  return (
    <div className="p-4 w-80 border rounded-md shadow-md bg-gray-50">
      <h1 className="text-lg font-semibold mb-3">Price</h1>
      <div className="space-y-4">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Min: ₹{priceRange[0].toLocaleString("en-IN")}</span>
          <span>Max: ₹{priceRange[1].toLocaleString("en-IN")}</span>
        </div>

        <Slider
          value={priceRange}
          onValueChange={(value) => handleSliderChange(value)}
          min={2000}
          max={200000}
          step={100}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default Price;
