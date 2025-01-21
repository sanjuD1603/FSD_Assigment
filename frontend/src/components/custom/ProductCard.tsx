"use client"; 

import React from "react";
import { Product } from "@/assets/interface/product";
import Image from "next/image";
import verified from "@/assets/images/Verified.gif";
interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="relative flex flex-col border rounded-lg shadow-lg bg-white">
      {product.verified && (
        <div className="absolute top-2 left-2  bg-opacity-50 text-white text-xs px-2 py-1 rounded-full font-bold flex items-center gap-1">
          <Image src={verified} alt="verified" width={40} height={40} />
        </div>
      )}

      <div className="h-48 overflow-hidden rounded-t-lg">
        <img
          src={product.images[0]?.thumbImage}
          alt={`${product.make} ${product.deviceModel}`}
          className="object-cover w-full h-full"
        />
      </div>

      <div className="p-4 space-y-1">
        <h3 className="text-base font-semibold">
           {product.deviceModel}
        </h3>
        <p className="text-xs text-gray-500">
          {product.deviceRam} / {product.deviceStorage} •{" "}
          {product.deviceCondition}
        </p>
        <p className="text-lg font-bold text-red-600">
          ₹{product.listingPrice.toLocaleString()}{" "}
        </p>
      </div>

      <div className="flex justify-between items-center text-xs text-gray-500 px-4 py-2 border-t">
        <p>
          {product.listingLocality}, {product.listingState}
        </p>
        <p>{product.listingDate}</p>
      </div>
    </div>
  );
};

export default ProductCard;
