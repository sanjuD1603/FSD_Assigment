"use client";

import { filterAtom } from "@/lib/store/filterAndSort";
import { useSetAtom } from "jotai";
import { useEffect, useState } from "react";

export default function Brand() {
  const [brands] = useState<string[]>([
    "Apple",
    "Samsung",
    "Xiaomi",
    "OnePlus",
    "Google",
    "Realme",
    "Oppo",
    "Vivo",
    "Motorola",
    "Nothing",
  ]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>(["Any Brand"]);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const setFilter = useSetAtom(filterAtom);

  useEffect(() => {
    if (selectedBrands.includes("Any Brand")) {
      setFilter((prev) => ({
        ...prev,
        make: [],
      }));
    } else {
      setFilter((prev) => ({
        ...prev,
        make: selectedBrands,
      }));
    }
  }, [selectedBrands, setFilter]);

  const handleCheckboxChange = (brand: string) => {
    if (brand === "Any Brand") {
      setSelectedBrands(["Any Brand"]);
    } else {
      const updatedSelectedBrands = selectedBrands.includes(brand)
        ? selectedBrands.filter((b) => b !== brand)
        : [...selectedBrands.filter((b) => b !== "Any Brand"), brand];

      setSelectedBrands(updatedSelectedBrands);
    }
  };

  const handleSelectAll = () => {
    setSelectedBrands(["Any Brand"]);
  };

  const filteredBrands = brands.filter((brand) =>
    brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 w-80 border rounded-md shadow-md">
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-lg font-semibold">Brands</h1>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-blue-500 text-sm underline focus:outline-none"
        >
          {isCollapsed ? "Show" : "Collapse"}
        </button>
      </div>
      {!isCollapsed && (
        <>
          <input
            type="text"
            placeholder="Search Brand"
            className="w-full px-3 py-2 mb-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="space-y-2 max-h-64 overflow-y-auto">
            
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-blue-600"
                  checked={selectedBrands.includes("Any Brand")}
                  onChange={handleSelectAll}
                />
                <span>Any Brand</span>
              </label>
              <hr className="my-2" />
            </div>
            {filteredBrands.map((brand) => (
              <label key={brand} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-blue-600"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => handleCheckboxChange(brand)}
                />
                <span>{brand}</span>
              </label>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
