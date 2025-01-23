"use client";

import { filterAtom } from "@/lib/store/filterAndSort";
import { useAtom } from "jotai";
import { useState } from "react";
import { notify } from "@/components/custom/NotificationProvider";
export default function Brand() {
  const [filter, setFilter] = useAtom(filterAtom);
  const brands = [
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
  ];
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

 
  const filteredBrands = brands.filter((brand) =>
    brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCheckboxChange = (brand: string) => {
    if (brand === "Any Brand") {
      setFilter((prev) => ({
        ...prev,
        make: [], 
      }));
    } else {
      const isSelected = filter.make?.includes(brand);
      setFilter((prev) => ({
        ...prev,
        make: isSelected
          ? filter.make?.filter((b) => b !== brand) 
          : [...(filter.make || []), brand], 
      }));
    }
    notify("Results Fetched Successfully");
  };

  const handleSelectAll = () => {
    setFilter((prev) => ({
      ...prev,
      make: [],
    }));
  };

  return (
    <div className="p-4 border rounded-md shadow-lg hover:shadow-xl transition-shadow duration-300 w-full sm:w-64 md:w-72 lg:w-80">
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-lg font-semibold">Brands</h1>
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
          <input
            type="text"
            placeholder="Search Brand"
            className="w-full px-3 py-2 mb-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1D506A]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="space-y-2 max-h-64 overflow-y-auto">
            <div>
              <label className="flex items-center space-x-2 custom-scrollbar">
                <input
                  type="checkbox"
                  className="peer hidden"
                  checked={filter.make?.length === 0} 
                  onChange={handleSelectAll}
                />
                <span className="w-5 h-5 border border-[#1D506A] rounded-sm flex items-center justify-center peer-checked:bg-[#1D506A] peer-checked:border-[#1D506A]">
                  {filter.make?.length === 0 && (
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
                <span>Any Brand</span>
              </label>
              <hr className="my-2" />
            </div>
            {filteredBrands.map((brand) => (
              <label key={brand} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="peer hidden"
                  checked={filter.make?.includes(brand)} 
                  onChange={() => handleCheckboxChange(brand)}
                />
                <span className="w-5 h-5 border border-[#1D506A] rounded-sm flex items-center justify-center peer-checked:bg-[#1D506A] peer-checked:border-[#1D506A]">
                  {filter.make?.includes(brand) && (
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
                <span>{brand}</span>
              </label>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
