// src/components/ProductCard.tsx
"use client";
import { Product } from '../domain/types/ProductType';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void; // Função para adicionar ao carrinho
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="border rounded-lg p-4 bg-white text-black">
      <h2 className="font-bold">{product.title}</h2>
      <p>{product.description}</p>
      <p className="text-lg font-semibold">${product.price}</p>
      
      <div className="flex justify-between mt-4">
        <Link href={`/products/${product.id}`}>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Ver Detalhes
          </button>
        </Link>
        <button
          onClick={() => onAddToCart(product)} // Chama a função para adicionar ao carrinho
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
