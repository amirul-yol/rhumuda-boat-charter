export interface Service {
    name: string;
  }
  
  export interface Package {
    id: string;
    title: string;
    price: string;
    priceLabel: string;
    services: Service[];
    imageUrl: string;
    maxCapacity?: number;
    duration?: string;
  }