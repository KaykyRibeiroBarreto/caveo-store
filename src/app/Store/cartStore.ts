import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CartState, Product } from '../domain/types/ProductType';

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      addToCart: (product: Product) => set((state) => {
        const existingProduct = state.items.find(item => item.id === product.id);
        if (existingProduct) {
          return {
            items: state.items.map(item =>
              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            ),
          };
        } else {
          return { items: [...state.items, { ...product, quantity: 1 }] };
        }
      }),

      removeFromCart: (productId: number) => set((state) => ({
        items: state.items
          .map(item =>
            item.id === productId && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter(item => item.quantity > 0),
      })),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
