import { Request, Response } from "express";
import Product from "../models/productModel.js";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const {
      page = 1,                
      limit = 8,               
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
        const maxDistanceInRadians = parseFloat(distance) / 6378.1; 
      
        filters.location = {
          $geoWithin: {
            $centerSphere: [[lng, lat], maxDistanceInRadians],
          },
        };
      }

 
    if (brands) filters.make = { $in: (brands as string).split(",") };

    // Filtering by condition
    if (condition) filters.deviceCondition = condition;

    // Filtering by storage
    if (storage) filters.deviceStorage = storage;

    // Filtering by verification
    if (verification) filters.verified = verification === "true";

    // Filtering by warranty availability
    if (warranty) filters.warranty = warranty;

    // Price range filter
    if (priceMin || priceMax) {
      filters.listingPrice = {};
      if (priceMin) filters.listingPrice.$gte = parseInt(priceMin as string);
      if (priceMax) filters.listingPrice.$lte = parseInt(priceMax as string);
    }

    
    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
    const total = await Product.countDocuments(filters); 
    const products = await Product.find(filters).skip(skip).limit(parseInt(limit as string));

    
    res.status(200).json({
      total,
      page: parseInt(page as string),
      limit: parseInt(limit as string),
      hasMore: skip + products.length < total, 
      products,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products", details: error.message });
  }
};
