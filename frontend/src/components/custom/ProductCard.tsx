"use client";

import React from "react";
import { Product } from "@/assets/interface/product";
import Image from "next/image";
import verified from "@/assets/images/Verified.gif";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  function isValidUrl(url: string) {
    try {
      // Attempt to create a new URL object
      new URL(url);
      // Check if the protocol is HTTP or HTTPS
      return /^https?:\/\//.test(url);
    } catch (e) {
      console.log(e);
      return false;
    }
  }
  return (
    <div className="relative flex flex-col border rounded-lg shadow-lg bg-white w-full sm:w-[180px] md:w-[200px] lg:w-[220px] xl:w-[240px] h-auto hover:border-2 hover:border-[#1D506A] transition-transform duration-300 hover:scale-105">
      {product.verified && (
        <div className="absolute top-2 left-2 bg-opacity-50 text-white text-xs px-2 py-1 rounded-full font-bold flex items-center gap-1">
          <Image src={verified} alt="verified" width={24} height={24} />
        </div>
      )}

      <div className="h-[160px] sm:h-[180px] md:h-[200px] lg:h-[220px] overflow-hidden rounded-t-lg">
        <Image
          src={
            isValidUrl(product.images[0]?.thumbImage)
              ? product.images[0]?.thumbImage
              : "/placeholder.png"
          }
          alt={`${product.make} ${product.deviceModel}`}
          className="object-cover"
          width={300}
          height={400}
        />
      </div>

      <div className="p-4 space-y-2">
        <h3 className="text-sm font-semibold">{product.deviceModel}</h3>
        <p className="text-xs text-gray-500">
          {product.deviceRam} / {product.deviceStorage} •{" "}
          {product.deviceCondition}
        </p>
        <p className="text-lg font-bold text-red-600">
          ₹{product.listingPrice.toLocaleString()}
        </p>
      </div>

      <div className="flex justify-between items-center text-xs text-gray-500 px-4 py-2 border-t">
        <p className="text-ellipsis overflow-hidden whitespace-nowrap w-[120px]">
          {product.listingLocality}, {product.listingState}
        </p>
        <p>{product.listingDate}</p>
      </div>
    </div>
  );
};

export default ProductCard;
