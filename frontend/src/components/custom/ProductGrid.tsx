"use client";

import React from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/assets/interface/product";
import { useProducts } from "@/lib/productQuery";

const ProductGrid: React.FC = () => {

const { data:products , isLoading , isError } = useProducts();
  // const [products, setProducts] = useState<Product[]>([]);

  // const retrieveData = async () => {
  //   try {
  //     const response = await fetch(
  //       `${process.env.NEXT_PUBLIC_BACKEND_END_POINT}/products`
  //     );
  //     const data = await response.json();
    

     
  //     setProducts(data.products || []); 
  //   } catch (error) {
  //     console.error("Error fetching products:", error); 
  //   }
  // };

  // useEffect(() => {
  //   retrieveData();
  // }, []);

  if (isLoading) {
    return <p className="text-center text-gray-500">Loading products...</p>;
  }

  if (isError) {
    return <p className="text-center text-red-500">Error fetching products.</p>;
  }

  return (
    <div className="grid grid-cols-4 gap-6 p-6 sm:grid-cols-2  mg:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {products && products.length > 0 ? (
        products.map((product : Product) => (
          <ProductCard key={product._id} product={product} />
        ))
      ) : (
        <p className="text-center text-gray-500">products unavaliable</p>
      )}
    </div>
  );
};

export default ProductGrid;
