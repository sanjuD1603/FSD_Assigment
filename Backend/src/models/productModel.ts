import mongoose, { Schema, Document, Model } from "mongoose";


interface IProduct {
  deviceCondition: string;
  listedBy: string;
  deviceStorage: string;
  images: {
    thumbImage: string;
    fullImage: string;
  }[];
  listingState: string;
  listingLocation: string;
  listingLocality: string;
  listingPrice: number;
  make: string;
  marketingName: string;
  deviceModel: string; 
  verified: boolean;
  listingId: string;
  listingDate: string;
  deviceRam: string;
  warranty: string;
  location: {
    type: string;
    coordinates: number[];
  };
}


interface IProductDoc extends IProduct, Document {}


const ProductSchema: Schema = new Schema({
  deviceCondition: { type: String, required: true },
  listedBy: { type: String, required: true },
  deviceStorage: { type: String, required: true },
  images: [
    {
      thumbImage: { type: String, required: true },
      fullImage: { type: String, required: true },
    },
  ],
  listingState: { type: String, required: true },
  listingLocation: { type: String, required: true },
  listingLocality: { type: String, required: true },
  listingPrice: { type: Number, required: true },
  make: { type: String, required: true },
  marketingName: { type: String, required: true },
  deviceModel: { type: String, required: true }, 
  verified: { type: Boolean, required: true },
  listingId: { type: String, required: true },
  listingDate: { type: String, required: true },
  deviceRam: { type: String, required: true },
  warranty: { type: String, required: true },
  location: {
    type: { type: String, enum: ["Point"], required: true },
    coordinates: { type: [Number], required: true },
  },
});


ProductSchema.index({ location: "2dsphere" });


const Product: Model<IProductDoc> = mongoose.model<IProductDoc>("Product",ProductSchema);

export default Product;
