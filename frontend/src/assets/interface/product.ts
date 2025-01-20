
  export interface Product {
    _id:string;
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