// src/components/InfiniteScroll.tsx
"use client";
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchProducts } from '../domain/api/product'; 
import { Product } from '../domain/types/ProductType';
import { useCartStore } from '../Store/cartStore'; 
import ProductCard from './ProductCard'; 
import { motion } from 'framer-motion';

export const InfiniteScroll = () => {
  const { addToCart } = useCartStore(); 

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    isError,
  } = useInfiniteQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: async ({ pageParam = 1 }) => fetchProducts(pageParam as number),
    getNextPageParam: (lastPage) => {
      return lastPage.length === 10 ? lastPage.length / 10 + 1 : undefined;
    },
    initialPageParam: 1,
  });

  const products = data ? data.pages.flat() : [];

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error fetching products.</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={addToCart} 
          />
        ))}
      </div>

      {hasNextPage && (
        <div className="flex justify-center mt-4">
          {isFetchingNextPage ? (
            <motion.div
              className="border-t-4 border-b-4 border-blue-600 rounded-full w-8 h-8"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1 }}
            />
          ) : (
            <button
              onClick={() => fetchNextPage()}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Carregar mais produtos
            </button>
          )}
        </div>
      )}
    </div>
  );
};
