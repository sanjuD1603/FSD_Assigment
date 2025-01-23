import { atom } from "jotai";

export interface FilterAtomInterface {
  ram?: string[];
  make?: string[];
  model?: string[];
  condition?: string[];
  storage?: string[];
  warranty?: string[];
  verified?: true | "";
  maxDistance?: number;
  priceRange?: [number, number];
  coordinates?: [number, number];
  status?: string[];
  listingState?:string;
}

export const filterAtom = atom<FilterAtomInterface>({
  ram: [],
  make: [],
  model: [],
  condition: [],
  storage: [],
  warranty: [],
  verified: undefined,
  maxDistance: undefined,
  coordinates: undefined,
  priceRange: undefined,
  status: [],
  listingState:"",
});
