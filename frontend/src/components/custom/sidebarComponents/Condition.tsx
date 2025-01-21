"use client";

import { filterAtom } from "@/lib/store/filterAndSort";
import { useSetAtom } from "jotai";
import { useEffect, useState } from "react";

export default function Condition() {
  const [conditions] = useState<string[]>([
    "Like New",
    "Fair",
    "Excellent",
    "Good",
    "Needs Repair",
  ]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([
    "Any Condition",
  ]);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const setFilter = useSetAtom(filterAtom);

  useEffect(() => {
    if (selectedConditions.includes("Any Condition")) {
      setFilter((prev) => ({
        ...prev,
        condition: [],
      }));
    } else {
      setFilter((prev) => ({
        ...prev,
        condition: selectedConditions,
      }));
    }
  }, [selectedConditions, setFilter]);

  const handleCheckboxChange = (condition: string) => {
    if (condition === "Any Condition") {
      setSelectedConditions(["Any Condition"]);
    } else {
      const updatedSelectedConditions = selectedConditions.includes(condition)
        ? selectedConditions.filter((c) => c !== condition)
        : [
            ...selectedConditions.filter((c) => c !== "Any Condition"),
            condition,
          ];
      if (updatedSelectedConditions.length === 0) {
        setSelectedConditions(["Any Condition"]);
      } else {
        setSelectedConditions(updatedSelectedConditions);
      }
    }
  };

  const handleSelectAll = () => {
    setSelectedConditions(["Any Condition"]);
  };

  const filteredConditions = conditions.filter((condition) =>
    condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 w-80 border rounded-md shadow-md">
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-lg font-semibold">Condition</h1>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-blue-500 text-sm underline focus:outline-none"
        >
          {isCollapsed ? "Show" : "Collapse"}
        </button>
      </div>
      {!isCollapsed && (
        <>
        
          <div className="space-y-2 max-h-64 overflow-y-auto">
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-blue-600"
                  checked={selectedConditions.includes("Any Condition")}
                  onChange={handleSelectAll}
                />
                <span>Any Condition</span>
              </label>
              <hr className="my-2" />
            </div>
            {filteredConditions.map((condition) => (
              <label key={condition} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-blue-600"
                  checked={selectedConditions.includes(condition)}
                  onChange={() => handleCheckboxChange(condition)}
                />
                <span>{condition}</span>
              </label>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
