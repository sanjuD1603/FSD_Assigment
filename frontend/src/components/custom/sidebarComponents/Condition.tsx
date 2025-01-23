"use client";

import { filterAtom } from "@/lib/store/filterAndSort";
import { useAtom } from "jotai";
import { useState } from "react";
import { notify } from "@/components/custom/NotificationProvider";

export default function Condition() {
  const [filter, setFilter] = useAtom(filterAtom); 
  const conditions = ["Like New", "Fair", "Excellent", "Good", "Needs Repair"];
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  
  const filteredConditions = conditions.filter((condition) =>
    condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCheckboxChange = (condition: string) => {
    if (condition === "Any Condition") {
      setFilter((prev) => ({
        ...prev,
        condition: [], 
      }));
    } else {
      const isSelected = filter.condition?.includes(condition);
      setFilter((prev) => ({
        ...prev,
        condition: isSelected
          ? filter.condition?.filter((c) => c !== condition) 
          : [...(filter.condition || []), condition], 
      }));
    }
    notify("Results Fetched Successfully");
  };

  const handleSelectAll = () => {
    setFilter((prev) => ({
      ...prev,
      condition: [], 
    }));
  };

  return (
    <div className="p-4 w-80 border rounded-md shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-lg font-semibold">Condition</h1>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="focus:outline-none"
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
              isCollapsed ? "rotate-180" : "rotate-0"
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
      {!isCollapsed && (
        <>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="peer hidden"
                  checked={filter.condition?.length === 0} 
                  onChange={handleSelectAll}
                />
                <span className="w-5 h-5 border border-[#1D506A] rounded-sm flex items-center justify-center peer-checked:bg-[#1D506A] peer-checked:border-[#1D506A]">
                  {filter.condition?.length === 0 && (
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
                <span>Any Condition</span>
              </label>
              <hr className="my-2" />
            </div>
            {filteredConditions.map((condition) => (
              <label key={condition} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="peer hidden"
                  checked={filter.condition?.includes(condition)} 
                  onChange={() => handleCheckboxChange(condition)}
                />
                <span className="w-5 h-5 border border-[#1D506A] rounded-sm flex items-center justify-center peer-checked:bg-[#1D506A] peer-checked:border-[#1D506A]">
                  {filter.condition?.includes(condition) && (
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
                <span>{condition}</span>
              </label>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
