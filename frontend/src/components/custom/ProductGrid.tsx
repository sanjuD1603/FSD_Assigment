"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/assets/interface/product";
import { useInfiniteQuery } from "@tanstack/react-query";

const fetchProducts = async ({pageParam = 1}) =>{}

const ProductGrid: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const retrieveData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_END_POINT}/products`
      );
      const data = await response.json();
    

     
      setProducts(data.products || []); 
    } catch (error) {
      console.error("Error fetching products:", error); 
    }
  };

  useEffect(() => {
    retrieveData();
  }, []);

  return (
    <div className="grid grid-cols-4 gap-6 p-6 sm:grid-cols-2  mg:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {products.length > 0 ? (
        products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))
      ) : (
        <p className="text-center text-gray-500">products unavaliable</p>
      )}
    </div>
  );
};

export default ProductGrid;
