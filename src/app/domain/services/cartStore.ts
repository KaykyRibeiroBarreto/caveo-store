import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CartState, ProductType } from '../types/ProductType';

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],

        // Função para adicionar produto ao carrinho
        addToCart: (product: ProductType) => set((state) => {
          // Verifica se o produto já está no carrinho
          const existingProduct = state.items.find(item => item.id === product.id);
  
          if (existingProduct) {
            // Se o produto já estiver no carrinho, incrementa a quantidade
            return {
              items: state.items.map(item =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 } // Atualiza a quantidade
                  : item
              ),
            };
          } else {
            // Se o produto não estiver no carrinho, adiciona com quantity: 1
            return { items: [...state.items, { ...product, quantity: 1 }] };
          }
        }),
  
        // Função para remover produto do carrinho
        removeFromCart: (productId: number) => set((state) => ({
          items: state.items
            .map(item =>
              item.id === productId && item.quantity > 1
                ? { ...item, quantity: item.quantity - 1 } // Diminui a quantidade se for maior que 1
                : item
            )
            .filter(item => item.quantity > 0), // Remove o item se a quantidade chegar a 0
        })),
  
        // Função para limpar o carrinho
        clearCart: () => set({ items: [] }), // Limpa todos os itens
      }),
      {
        name: 'cart-storage', 
        storage: createJSONStorage(() => localStorage), 
      }
    )
  );