export interface Rating {
    rate: number;
    count: number;
  }
  
  export interface Product {
    id: number;
    title: string;
    price: number | null;
    description: string | null;
    category: string;
    image: string;
    rating: Rating;
  }