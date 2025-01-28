export interface PriceTier {
  type: "FIXED" | "ADULT" | "CHILD" | "INFANT";
  price: number;
  label: string;
}

export interface Service {
  name: string;
  description?: string;
}

export interface Package {
  id: string;
  title: string;
  categoryId: number;
  description?: string;
  priceTiers: PriceTier[];
  services: Service[];
  imageUrl: string;
  maxCapacity?: number;
  durationMinutes?: number;
  isPrivate?: boolean;
  distanceMinKm?: number;
  distanceMaxKm?: number;
  fishingType?: string;
}
