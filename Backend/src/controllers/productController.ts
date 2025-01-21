import { Request, Response } from "express";
import Product from "../models/productModel.js";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const {
      ram,
      models,
      distance,
      brands,
      condition,
      coordinates,
      storage,
      verified,
      warranty,
      priceMin,
      priceMax,
    } = req.query;

    const filters: any = {};

   
    if (distance && coordinates) {
      const [lng, lat] = (coordinates as string).split(",").map(Number);
      if (
        isNaN(lng) || isNaN(lat) || lng < -180 || lng > 180 || lat < -90 || lat > 90
      ) {
        return res.status(400).json({ error: "Invalid coordinates" });
      }
      const maxDistanceInRadians = parseFloat(distance) / 6378.1;
      filters.location = {
        $geoWithin: {
          $centerSphere: [[lng, lat], maxDistanceInRadians],
        },
      };
    }

    
    if (brands) filters.make = { $in: (brands as string).split(",") };

    if (condition)
      filters.deviceCondition = { $in: (condition as string).split(",") };

    if (storage) {
      filters.deviceStorage = { $in: (storage as string).split(",") };
    }

    if (ram) {
      filters.deviceRam = { $in: (ram as string).split(",") };
    }

    if (models) filters.deviceModel = { $in: (models as string).split(",") };

    
    if (verified) filters.verified = verified === "true";

    
    if (warranty) filters.warranty = warranty;

    
    if (priceMin || priceMax) {
      filters.listingPrice = {};
      if (priceMin) filters.listingPrice.$gte = parseInt(priceMin as string);
      if (priceMax) filters.listingPrice.$lte = parseInt(priceMax as string);
    }
    console.log(filters);
    
    const products = await Product.find(filters).sort({ listingPrice: 1 }); 

    res.status(200).json({
      total: products.length,
      products,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch products", details: error.message });
  }
};
