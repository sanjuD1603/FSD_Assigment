"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import logo from "@/assets/images/image.png";
import { useAtom } from "jotai";
import { filterAtom } from "@/lib/store/filterAndSort";
import { useProducts } from "@/lib/productQuery"; 

const Navbar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState(""); 
  const [brands, setBrands] = useState<string[]>([]); 
  const [models, setModels] = useState<string[]>([]); 
  const [filteredModels, setFilteredModels] = useState<string[]>([]); 
  const [filter, setFilter] = useAtom(filterAtom); 

  const { data: products, isLoading } = useProducts(); 

  
  useEffect(() => {
    if (products && !isLoading) {
      const uniqueBrands = Array.from(
        new Set(products.map((p) => p.make).filter((brand) => typeof brand === "string"))
      );
      const allModels = products
        .map((p) => p.deviceModel)
        .filter((model) => typeof model === "string");

      setBrands(uniqueBrands); 
      setModels(allModels); 
    }
  }, [products, isLoading]);

  
  useEffect(() => {
    if (filter.make && filter.make.length > 0) {
      const associatedModels = models.filter((model) =>
        model.toLowerCase().includes(filter.make![0].toLowerCase())
      );
      setFilteredModels(associatedModels); 
    } else {
      setFilteredModels(models);
    }
  }, [filter.make, models]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value); 

    if (value.trim() === "") {
    setFilter({make : [] , model : []})
    }
  };

  const handleSearchSubmit = () => {
    
    if (brands.some((brand) => brand.toLowerCase().includes(searchTerm.toLowerCase()))) {
      setFilter((prev) => ({ ...prev, make: [searchTerm], model: [] })); 
    } else if (
      models.some((model) => model.toLowerCase().includes(searchTerm.toLowerCase()))
    ) {
      setFilter((prev) => ({ ...prev, model: [searchTerm] })); 
    } else {
      setFilter((prev) => ({ ...prev, make: [], model: [] })); 
    }
  };

  const handleSelectOption = (option: string, type: "brand" | "model") => {
    if (type === "brand") {
      setFilter((prev) => ({ ...prev, make: [option], model: [] })); 
      setSearchTerm(option); 
      setFilteredModels(models); 
    } else {
      setFilter((prev) => ({ ...prev, model: [option] })); 
      setSearchTerm(option); 
      setFilteredModels([option]); 
    }
  };

  return (
    <nav className="p-4 flex items-center space-x-4">
     
      <Image src={logo} alt="Logo" width={50} height={50} />

     
      <div className="relative flex-1">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search by brand or model"
            value={searchTerm}
            onChange={handleSearchChange}
            className="border rounded-md px-2 py-1 w-full text-black" 
          />
          <button
            onClick={handleSearchSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Submit
          </button>
        </div>

        
        {searchTerm && (
          <div className="absolute z-10 bg-white border mt-1 w-full max-h-48 overflow-y-auto">
            {brands
              .filter((brand) => brand.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((brand, index) => (
                <div
                  key={`${brand}-${index}`} 
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-black"
                  onClick={() => handleSelectOption(brand, "brand")}
                >
                  {brand}
                </div>
              ))}
            {filteredModels
              .filter((model) => model.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((model, index) => (
                <div
                  key={`${model}-${index}`} 
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-black"
                  onClick={() => handleSelectOption(model, "model")}
                >
                  {model}
                </div>
              ))}
          </div>
        )}
      </div>

     
      <button className="px-4 py-2 bg-blue-500 text-white rounded-md">Account</button>
      <button className="px-4 py-2 bg-blue-500 text-white rounded-md">Add Product</button>
    </nav>
  );
};

export default Navbar;
