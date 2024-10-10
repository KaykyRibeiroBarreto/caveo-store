"use client";
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchProducts } from '../domain/api/product'; 
import { Product } from '../domain/types/ProductType';
import Link from 'next/link';

export const InfiniteScroll = () => {
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
          <div key={product.id} className="border rounded-lg p-4 bg-white text-black">
            <h2 className="font-bold">{product.title}</h2>
            <p>{product.description}</p>
            <p className="text-lg font-semibold">${product.price}</p>
            
            <Link href={`/products/${product.id}`}>
              <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Ver Detalhes
              </button>
            </Link>
          </div>
        ))}
      </div>

      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {isFetchingNextPage ? 'Carregando mais...' : 'Carregar mais produtos'}
        </button>
      )}
    </div>
  );
};
