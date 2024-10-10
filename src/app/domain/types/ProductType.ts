import {  ReactNode } from 'react';

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

  export interface NavbarProps {
    darkMode: boolean;
    toggleDarkMode: () => void;
  }


export interface LayoutProps {
  children: ReactNode; 
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CartState {
  items: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
}