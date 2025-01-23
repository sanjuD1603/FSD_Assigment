"use client";
import React from "react";
import { useAtom } from "jotai";
import { filterAtom } from "@/lib/store/filterAndSort";

export default function Filter() {
  const [filter, setFilter] = useAtom(filterAtom);

  const filters = [
    ...(filter?.make || []),
    ...(filter?.storage || []),
    ...(filter?.condition || []),
    ...(filter?.ram || []),
    ...(filter?.warranty || []),
    ...(filter?.model || []),
  ];

  const handleRemoveFilter = (filterToRemove: string) => {
    
    const updatedFilter: {
      ram?: string[];
      make?: string[];
      model?: string[];
      condition?: string[];
      storage?: string[];
      warranty?: string[];
      [key: string]: any; 
    } = { ...filter };

    
    for (const key of Object.keys(updatedFilter) as Array<
      keyof typeof updatedFilter
    >) {
      if (Array.isArray(updatedFilter[key])) {
        updatedFilter[key] = updatedFilter[key]?.filter(
          (value: string) => value !== filterToRemove
        );
      }
    }

    setFilter(updatedFilter); 
    // console.log(`Removed filter: ${filterToRemove}`, updatedFilter);
  };

  return (
    <div className="flex flex-wrap gap-2 my-4">
      {filters.map((item, index) => (
        <div
          key={index}
          className="flex items-center  text-[#1D506A] px-4 py-2 rounded border border-gray-300 shadow-sm text-sm"
        >
          {item}
          <button
            onClick={() => handleRemoveFilter(item)}
            className="ml-2 bg-white text-[#1D506A] hover:underline focus:underline rounded-full px-2 py-1 focus:outline-none"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
