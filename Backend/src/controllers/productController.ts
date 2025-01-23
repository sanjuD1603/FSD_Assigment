import { Request, Response } from "express";
import Product from "../models/productModel.js";
import mongoose from "mongoose";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const {
      ram,
      models,
      distance,
      brands,
      condition,
      listingState,
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
      // console.log(lat, lng);
      if (
        isNaN(lng) ||
        isNaN(lat) ||
        lng < -180 ||
        lng > 180 ||
        lat < -90 ||
        lat > 90
      ) {
        return res.status(400).json({ error: "Invalid coordinates" });
      }
      const numericDistance = Array.isArray(distance)
        ? parseFloat(distance[0] as string)
        : parseFloat(distance as string);
      const maxDistanceInRadians = numericDistance * 1000;
      filters.location = {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [lat, lng],
          },
          $maxDistance: maxDistanceInRadians,
          $minDistance: 0,
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

    if (listingState) filters.listingState = listingState;

    if (priceMin || priceMax) {
      filters.listingPrice = {};
      if (priceMin) filters.listingPrice.$gte = parseInt(priceMin as string);
      if (priceMax) filters.listingPrice.$lte = parseInt(priceMax as string);
    }
    // console.log(JSON.stringify(filters));

    const products = await Product.find(filters).sort({
      listingPrice: 1,
      location: -1,
    });

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

export const addProduct = async (req: Request, res: Response) => {
  try {
    const {
      make,
      deviceModel,
      deviceCondition,
      listingPrice,
      listedBy,
      warranty,
      listingLocation,
      listingState,
      listingLocality,
      deviceRam,
      deviceStorage,
    } = req.body;

    if (
      !make ||
      !deviceModel ||
      !deviceCondition ||
      !listingPrice ||
      !listedBy ||
      !warranty
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }


    const newProduct = new Product({
      make,
      deviceModel,
      deviceCondition,
      listingPrice: parseFloat(listingPrice),
      listedBy,
      warranty,
      listingLocation: listingLocation || "N/A",
      listingState: listingState || "N/A",
      listingLocality: listingLocality || "N/A",
      deviceStorage, 
      marketingName: `${make} ${deviceModel}`, 
      verified: false, 
      listingId: new mongoose.Types.ObjectId().toHexString(), 
      listingDate: new Date().toISOString(), 
      deviceRam,
      location: {
        type: "Point",
        coordinates: [0, 0],
      },
      images: [
        {
          thumbImage: "https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=612x612&w=0&k=20&c=hnh2OZgQGhf0b46-J2z7aHbIWwq8HNlSDaNp2wn_iko=", 
          fullImage: "https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=612x612&w=0&k=20&c=hnh2OZgQGhf0b46-J2z7aHbIWwq8HNlSDaNp2wn_iko=", 
        },
      ],
    });
    const savedProduct = await newProduct.save();
    res.status(201).json({
      message: "Product created successfully",
      product: savedProduct,
    });
  } catch (error) {
    console.error("Error saving product:", error);
    res.status(500).json({ error: "Failed to create product" });
  }
};


