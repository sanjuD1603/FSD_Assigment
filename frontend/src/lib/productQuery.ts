import { useQuery } from "@tanstack/react-query";

const fetchProduct = async() =>{
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_END_POINT}/products`);
    if(!response.ok)
    {
    console.log("Error in fetching products");
    }
    const data = await response.json();
    return data.products || [];
};

const useProducts = () =>{
    return useQuery({
        queryKey: ["products"],
        queryFn:fetchProduct,
    })
};

export { useProducts } 