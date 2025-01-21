"use client";

import { filterAtom } from "@/lib/store/filterAndSort";
import { useSetAtom } from "jotai";
import { useEffect, useState } from "react";

export default function Storage() {
  const [storageOptions] = useState<string[]>([
    "4 GB",
    "8 GB",
    "16 GB",
    "32 GB",
    "64 GB",
    "128 GB",
    "256 GB",
    "512 GB",
    "1 TB",
  ]);
  const [selectedStorage, setSelectedStorage] = useState<string[]>([
    "Any Storage",
  ]);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const setFilter = useSetAtom(filterAtom);

  useEffect(() => {
    if (selectedStorage.includes("Any Storage")) {
      setFilter((prev) => ({
        ...prev,
        storage: [],
      }));
    } else {
      setFilter((prev) => ({
        ...prev,
        storage: selectedStorage,
      }));
    }
  }, [selectedStorage, setFilter]);

  const handleCheckboxChange = (storage: string) => {
    if (storage === "Any Storage") {
      setSelectedStorage(["Any Storage"]);
    } else {
      const updatedSelectedStorage = selectedStorage.includes(storage)
        ? selectedStorage.filter((s) => s !== storage)
        : [...selectedStorage.filter((s) => s !== "Any Storage"), storage];

      setSelectedStorage(updatedSelectedStorage);
    }
  };

  const handleSelectAll = () => {
    setSelectedStorage(["Any Storage"]);
  };

  const filteredStorageOptions = storageOptions.filter((storage) =>
    storage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 w-80 border rounded-md shadow-md">
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-lg font-semibold">Storage</h1>
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
                  checked={selectedStorage.includes("Any Storage")}
                  onChange={handleSelectAll}
                />
                <span>Any Storage</span>
              </label>
              <hr className="my-2" />
            </div>
            <div className="grid grid-cols-2 gap-2">
            {filteredStorageOptions.map((storage) => (
              <label key={storage} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-blue-600"
                  checked={selectedStorage.includes(storage)}
                  onChange={() => handleCheckboxChange(storage)}
                />
                <span>{storage}</span>
              </label>
            ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
