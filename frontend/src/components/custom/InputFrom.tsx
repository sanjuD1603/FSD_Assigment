import React, { useState } from "react";
import { notify } from "@/components/custom/NotificationProvider";
import {
  FaMobileAlt,
  FaDollarSign,
  FaMapMarkerAlt,
  FaUser,
  FaClipboardCheck,
  FaWarehouse,
  FaBuilding,
  FaRupeeSign,
  FaCity,
} from "react-icons/fa";

interface FormData {
  make: string;
  deviceModel: string;
  deviceCondition: string;
  listingPrice: string;
  listedBy: string;
  warranty: string;
  listingLocation: string;
  listingState: string;
  listingLocality: string;
  deviceRam: string;
  deviceStorage: string;
}

interface InputFormProps {
  onClose: () => void;
}

const InputForm: React.FC<InputFormProps> = ({ onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    make: "",
    deviceModel: "",
    deviceCondition: "",
    listingPrice: "",
    listedBy: "",
    warranty: "",
    listingLocation: "",
    listingState: "",
    listingLocality: "",
    deviceRam: "",
    deviceStorage: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_END_POINT}/products/addproduct`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include",
        }
      );
      if (!response.ok) {
        notify("Data not submited", "error");
      } else {
        notify("Results Fetched Successfully");
      }

      onClose();
    } catch (e) {
      notify("An internal error occurred")
    }
  };

  const inputFields = [
    { label: "Company", name: "make", type: "text", icon: <FaMobileAlt /> },
    {
      label: "Model",
      name: "deviceModel",
      type: "text",
      icon: <FaClipboardCheck />,
    },
    {
      label: "Condition",
      name: "deviceCondition",
      type: "text",
      icon: <FaWarehouse />,
    },
    {
      label: "Price",
      name: "listingPrice",
      type: "text",
      icon: <FaRupeeSign />,
    },
    { label: "Name", name: "listedBy", type: "text", icon: <FaUser /> },
    {
      label: "Warranty",
      name: "warranty",
      type: "text",
      icon: <FaClipboardCheck />,
    },
    {
      label: "Location",
      name: "listingLocation",
      type: "text",
      icon: <FaMapMarkerAlt />,
    },
    {
      label: "State",
      name: "listingState",
      type: "text",
      icon: <FaBuilding />,
    },
    { label: "City", name: "listingLocality", type: "text", icon: <FaCity /> },
    {
      label: "RAM",
      name: "deviceRam",
      type: "text",
      icon: <FaClipboardCheck />,
    }, 
    {
      label: "Storage",
      name: "deviceStorage",
      type: "text",
      icon: <FaWarehouse />,
    }, 
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 bg-gray-800">
      <div
        className="bg-white rounded-lg shadow-lg p-8 w-full max-w-4xl relative overflow-y-auto"
        style={{
          maxHeight: "90vh", 
          margin: "20px", 
        }}
      >
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          ✕
        </button>
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
          Enter Device Details
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {inputFields.map(({ label, name, type, icon }, index) => (
              <div className="relative" key={index}>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  {label}
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-500 text-xl">
                    {icon}
                  </span>
                  <input
                    type={type}
                    name={name}
                    value={formData[name as keyof FormData]}
                    onChange={handleChange}
                    className="pl-14 py-3 text-lg block w-full rounded-lg text-black border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-lg"
                    placeholder={`Enter ${label}`}
                    required={
                      name !== "listingLocation" &&
                      name !== "listingState" &&
                      name !== "listingLocality"
                    }
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end items-center mt-8 space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-gray-200 text-gray-700 text-lg rounded-md hover:bg-gray-300"
            >
              Close
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-500 text-white text-lg rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InputForm;
