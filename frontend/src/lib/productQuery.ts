import { useQuery } from "@tanstack/react-query";
import { filterAtom } from "@/lib/store/filterAndSort";
import { useAtomValue } from "jotai";
import { Product } from "@/assets/interface/product";
const useProducts = () => {
  const filter = useAtomValue(filterAtom);

  const fetchProduct = async () => {
    const brandQuery =
      filter?.make && filter?.make.length > 0
        ? `brands=${filter.make.join(",")}`
        : "";
    const conditionQuery =
      filter?.condition && filter?.condition.length > 0
        ? `conditions=${filter.condition.join(",")}`
        : "";
    const storageQuery =
      filter?.storage && filter?.storage.length > 0
        ? `storage=${filter.storage.join(",")}`
        : "";
    const ramQuery =
      filter?.ram && filter?.ram.length > 0
        ? `ram=${filter.ram.join(",")}`
        : "";
    const verifiedQuery =
      filter?.verified !== undefined ? `verified=${filter.verified}` : "";

    const warrantyQuery =
      filter?.warranty && filter.warranty.length > 0
        ? `warranty=${filter.warranty.join(",")}`
        : "";
    const priceQuery =
      filter?.priceRange?.length === 2
        ? `priceMin=${filter.priceRange[0]}&priceMax=${filter.priceRange[1]}`
        : "";

    const modelQuery =
      filter?.model && filter.model.length > 0
        ? `models=${filter.model.join(",")}`
        : "";
    const coordinatesQuery =
      filter?.coordinates && filter?.maxDistance
        ? `coordinates=${filter.coordinates}&distance=${filter.maxDistance}`
        : "";


    const queryString = [
      brandQuery,
      conditionQuery,
      storageQuery,
      ramQuery,
      verifiedQuery,
      warrantyQuery,
      priceQuery,
      modelQuery,
      coordinatesQuery,
    ]
      .filter(Boolean)
      .join("&");

    console.log("Query String:", queryString);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_END_POINT}/products${
          queryString ? `?${queryString}` : ""
        }`
      );

      if (!response.ok) {
        console.error(
          `Error fetching products: ${response.status} ${response.statusText}`
        );
        return [];
      }

      const data = await response.json();
      console.log("Backend Response:", data);

      return data.products || [];
    } catch (error) {
      console.error("Fetch Error:", error);
      return [];
    }
  };

  return useQuery<Product[]>({
    queryKey: ["products", filter],
    queryFn: fetchProduct,
  });
};

export { useProducts };
