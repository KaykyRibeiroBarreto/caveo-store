"use client";
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchProducts } from '../domain/api/product'; 
import { ProductType } from '../domain/types/ProductType';
import { useCartStore } from '../domain/services/cartStore'; 
import ProductCard from './ProductCard'; 
import { motion } from 'framer-motion';
import { useEffect } from 'react';

export const InfiniteScroll = () => {
  const { addToCart } = useCartStore(); 

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    isError,
  } = useInfiniteQuery<ProductType[], Error>({
    queryKey: ['products'],
    queryFn: async ({ pageParam = 1 }) => fetchProducts(pageParam as number || 1),
    getNextPageParam: (lastPage, allPages) => {
      // A lógica de paginação precisa ser baseada em como a API retorna dados.
      // Se lastPage for uma lista com 10 itens, assume-se que há mais produtos.
      return lastPage.length === 10 ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
  });

  const products = data ? data.pages.flat() : [];

  // Adicionando o "scroll" para carregar automaticamente quando o usuário atinge o final da página
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const currentScroll = window.innerHeight + window.scrollY;

      if (currentScroll + 100 >= scrollHeight && hasNextPage && !isFetchingNextPage) {
        fetchNextPage(); // Carrega a próxima página
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Limpa o evento para evitar memory leaks
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error fetching products.</p>}

      {/* Grid para exibir os produtos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            addToCart={addToCart} 
          />
        ))}
      </div>

      {/* Se houver mais páginas para carregar */}
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
