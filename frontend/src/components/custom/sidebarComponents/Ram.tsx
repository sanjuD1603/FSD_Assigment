"use client";

import { filterAtom } from "@/lib/store/filterAndSort";
import { useSetAtom } from "jotai";
import { useEffect, useState } from "react";

export default function Ram() {
  const [ramOptions] = useState<string[]>([
    "2 GB",
    "4 GB",
    "6 GB",
    "8 GB",
    "12 GB",
    "16 GB",
    "32 GB",
  ]);
  const [selectedRam, setSelectedRam] = useState<string[]>(["Any RAM"]);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const setFilter = useSetAtom(filterAtom);

  
  useEffect(() => {
    if (selectedRam.includes("Any RAM")) {
      setFilter((prev) => ({
        ...prev,
        ram: [], 
      }));
    } else {
      setFilter((prev) => ({
        ...prev,
        ram: selectedRam, 
      }));
    }
  }, [selectedRam, setFilter]);

  const handleCheckboxChange = (ram: string) => {
    if (ram === "Any RAM") {
      
      setSelectedRam(["Any RAM"]);
    } else {
      const updatedSelectedRam = selectedRam.includes(ram)
        ? selectedRam.filter((r) => r !== ram) 
        : [...selectedRam.filter((r) => r !== "Any RAM"), ram]; 

      setSelectedRam(updatedSelectedRam);
    }
  };

  const handleSelectAll = () => {
    setSelectedRam(["Any RAM"]); 
  };

  
  const filteredRamOptions = ramOptions.filter((ram) =>
    ram.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 w-80 border rounded-md shadow-md">
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-lg font-semibold">RAM</h1>
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
                  checked={selectedRam.includes("Any RAM")}
                  onChange={handleSelectAll}
                />
                <span>Any RAM</span>
              </label>
              <hr className="my-2" />
            </div>
            <div className="grid grid-cols-2 gap-2">
            {filteredRamOptions.map((ram) => (
              <label key={ram} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-blue-600"
                  checked={selectedRam.includes(ram)}
                  onChange={() => handleCheckboxChange(ram)}
                />
                <span>{ram}</span>
              </label>
            ))}
            </div>
            
          </div>
        </>
      )}
    </div>
  );
}
