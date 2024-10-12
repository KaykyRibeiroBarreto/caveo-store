import {  ReactNode } from 'react';

export interface Rating {
    rate: number;
    count: number;
  }
  
  export interface ProductType {
    id: number;
    title: string;
    price: number | null;
    description: string | null;
    category: string;
    image: string;
    rating: Rating;
    quantity: number
    
  }

  export interface NavbarProps {
    darkMode: boolean;
    toggleDarkMode: () => void;
  }


export interface LayoutProps {
  children: ReactNode; 
}
export interface CartState {
  items: ProductType[];
  addToCart: (product: ProductType) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
}

