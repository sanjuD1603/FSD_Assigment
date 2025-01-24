"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import logo from "@/assets/images/logo.png";
import { useAtom } from "jotai";
import { filterAtom } from "@/lib/store/filterAndSort";
import { useProducts } from "@/lib/productQuery";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import FetchCities from "./FetchCities";

import Dialog from "./Dialog";
import InputForm from "./InputFrom";
const Navbar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [brands, setBrands] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const [filteredModels, setFilteredModels] = useState<string[]>([]);
  const [filter, setFilter] = useAtom(filterAtom);
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [user, setUser] = useState<{
    name: string;
    username: string;
    isAdminUser: boolean;
  } | null>(null);
  const { data: products, isLoading } = useProducts();

  useEffect(() => {
    if (products && !isLoading) {
      const uniqueBrands = Array.from(
        new Set(
          products
            .map((p) => p.make)
            .filter((brand) => typeof brand === "string")
        )
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
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      setFilter({ make: [], model: [] });
    }
  };

  const handleSearchSubmit = () => {
    if (
      brands.some((brand) =>
        brand.toLowerCase().includes(searchTerm.toLowerCase())
      )
    ) {
      setFilter((prev) => ({ ...prev, make: [searchTerm], model: [] }));
    } else if (
      models.some((model) =>
        model.toLowerCase().includes(searchTerm.toLowerCase())
      )
    ) {
      setFilter((prev) => ({ ...prev, model: [searchTerm] }));
    } else {
      setFilter((prev) => ({ ...prev, make: [], model: [] }));
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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

  const toggleCityModal = () => setIsCityModalOpen((prev) => !prev);
  const closeCityModal = () => setIsCityModalOpen(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_END_POINT}/api/users/user`,
          {
            credentials: "include",
          }
        );
        const userData = await response.json();
        setUser(userData.user);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUser();
  }, []);

  const handleClick = async (): Promise<void> => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_END_POINT}/api/users/logout`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (response.ok) {
        // const data: { message: string } = await response.json();
        // console.log("Logout successful:", data.message);
        window.location.href = "/sign-in";
      } else {
        const errorData: { error: string } = await response.json();
        console.error("Logout failed:", errorData.error);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <nav className="flex flex-col lg:flex-row items-center px-4 py-4 sm:px-6 lg:px-12 lg:space-y-0 space-y-4">
      <div className="flex items-center justify-between w-full lg:w-auto lg:flex-1 lg:justify-start">
        <div className="pl-4 sm:pl-10">
          <Link href="/">
            <Image src={logo} alt="Logo" width={140} height={120} />
          </Link>
        </div>

        <div className="lg:hidden">
          <button
            onClick={toggleCityModal}
            className="px-4 py-2 sm:p-2 lg:px-2 lg:py-1 bg-[#1D506A] border border-[#1D506A] rounded-md hover:bg-[#1D506A] hover:scale-105 transition-transform duration-200 ease-in-out"
          >
            Select Location
          </button>
        </div>
      </div>

      <div className="flex justify-center w-full lg:w-auto lg:flex-[2]">
        <div className="relative w-full max-w-[1200px] md:w-2/3 lg:w-3/4">
          <input
            type="text"
            placeholder="Search by brand or model"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full border h-12 shadow p-4 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1D506A]"
          />
          <button
            onClick={handleSearchSubmit}
            className="absolute top-1/2 transform -translate-y-1/2 right-4 text-blue-500 hover:text-blue-600"
          >
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 56.966 56.966"
            >
              <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17s-17-7.626-17-17S14.61,6,23.984,6z" />
            </svg>
          </button>
          {searchTerm && (
            <div className="absolute z-10 bg-white border mt-1 w-full max-h-48 overflow-y-auto">
              {brands
                .filter((brand) =>
                  brand.toLowerCase().includes(searchTerm.toLowerCase())
                )
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
                .filter((model) =>
                  model.toLowerCase().includes(searchTerm.toLowerCase())
                )
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
      </div>

      <div className="flex items-center space-x-4 justify-end sm:justify-center w-full sm:w-auto absolute bottom-4 right-4 sm:static sm:bottom-auto sm:right-auto lg:w-auto lg:flex lg:items-center lg:space-x-6 z-10">
        <div className="hidden lg:block">
          <button
            onClick={toggleCityModal}
            className="px-4 py-2 lg:py-1 lg:px-4 bg-[#1D506A] border border-[#1D506A] rounded-md hover:bg-[#1D506A] hover:scale-105 transition-transform duration-200 ease-in-out"
          >
            Select Location
          </button>
        </div>
        {isCityModalOpen && <FetchCities onClose={closeCityModal} />}
        {user && (
          <Popover>
            <PopoverTrigger asChild>
              <button className="flex items-center justify-center w-10 h-10 bg-[#1D506A] text-white rounded-full hover:bg-[#1D506A] hover:scale-105 transition-transform">
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 12c2.28 0 4-1.72 4-4s-1.72-4-4-4-4 1.72-4 4 1.72 4 4 4zm0 2c-3.68 0-8 1.84-8 4v2h16v-2c0-2.16-4.32-4-8-4z"
                  />
                </svg>
              </button>
            </PopoverTrigger>
            <PopoverContent className="p-4">
              <p className="text-black">Name: {user?.name}</p>
              <p className="text-black">Username: {user?.username}</p>
            </PopoverContent>
          </Popover>
        )}
        {user?.isAdminUser && (
          <Popover>
            <PopoverTrigger asChild>
              <button
                className="flex items-center justify-center w-10 h-10 bg-[#1D506A] text-white rounded-full hover:bg-[#1D506A] hover:scale-105 transition-transform"
                onClick={() => {
                  handleOpenModal();
                }}
              >
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
            </PopoverTrigger>
            {/* <PopoverContent className="p-4 w-full max-w-xs sm:max-w-sm lg:max-w-md">
              <h3 className="text-lg font-bold text-black text-center sm:text-left">
                Add Product
              </h3>
              <p className="text-sm text-gray-700 text-center sm:text-left">
                Quickly add a new product to your catalog.
              </p>
              <button
                className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 sm:w-auto sm:px-6"
                onClick={() => {
                  handleOpenModal(); 
                }}
              >
                Add Device
              </button>
            </PopoverContent> */}
          </Popover>
        )}
        {isModalOpen && <InputForm onClose={handleCloseModal} />}

        <div className="block lg:hidden flex items-center justify-center w-10 h-10 rounded-full">
          <Dialog />
        </div>

        <button
          className="flex items-center justify-center w-10 h-10 bg-[#1D506A] text-white rounded-full hover:bg-[#1D506A] hover:scale-105 transition-transform"
          onClick={handleClick}
        >
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12h14"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
};


export default Navbar;
