import { Request, Response } from "express";
import Product from "../models/productModel.js";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const {
      distance,               
      brands,
      condition,
      coordinates,
      storage,
      verification,
      warranty,
      priceMin,
      priceMax,
    } = req.query;

    const filters: any = {}; 

   
    if (distance && coordinates) {
      const [lng, lat] = (coordinates as string).split(",").map(Number);
      const maxDistanceInRadians = parseFloat(distance) / 6378.1; // 
      filters.location = {
        $geoWithin: {
          $centerSphere: [[lng, lat], maxDistanceInRadians],
        },
      };
    }

  
    if (brands) filters.make = { $in: (brands as string).split(",") };

  
    if (condition) filters.deviceCondition = condition;

  
    if (storage) filters.deviceStorage = storage;

   
    if (verification) filters.verified = verification === "true";

  
    if (warranty) filters.warranty = warranty;

  
    if (priceMin || priceMax) {
      filters.listingPrice = {};
      if (priceMin) filters.listingPrice.$gte = parseInt(priceMin as string);
      if (priceMax) filters.listingPrice.$lte = parseInt(priceMax as string);
    }

   
    const products = await Product.find(filters);

    res.status(200).json({
      total: products.length, 
      products, 
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products", details: error.message });
  }
};
