
"use client";
import { ProductType } from '../domain/types/ProductType';
import Link from 'next/link';
import { useCartStore } from '../domain/services/cartStore';
import { motion } from 'framer-motion';


interface ProductCardProps {
  product: ProductType;
  addToCart: (product: ProductType) => void; 
  removeFromCart?: (id: number) => void; 
}

export const ProductCard = ({ product }: ProductCardProps) => {
  // Pegando a função addToCart da store Zustand
  const addToCart = useCartStore(state => state.addToCart);
  const removeFromCart = useCartStore(state => state.removeFromCart);
  // Função para adicionar produto ao carrinho
  const onAddToCart = (product: ProductType) => {
    addToCart(product);
  };

  return (
    <motion.div 
    className="border rounded-lg p-6 bg-white text-black mx-auto max-w-sm shadow-lg"
    whileHover={{ scale: 1.03 }} // Efeito de "hover" para aumentar o card levemente
    whileTap={{ scale: 0.97 }}   // Efeito ao clicar no card
    initial={{ opacity: 0, y: 20 }} // Inicialmente invisível e um pouco deslocado
    animate={{ opacity: 1, y: 0 }}  // Animação ao aparecer
    transition={{ duration: 0.3 }}  // Duração da animação
  >
    {/* Centralizar a imagem com animação */}
    <motion.img 
      src={product.image} 
      alt={product.title} 
      className="w-48 h-32 object-cover rounded-t-lg mb-4 mx-auto"
      whileHover={{ scale: 1.1 }} // Zoom na imagem ao passar o mouse
      transition={{ duration: 0.3 }}
    />
    
    {/* Título e preço com espaçamento */}
    <h2 className="font-bold text-lg text-center mb-2">{product.title}</h2>
    <p className="text-lg font-semibold text-center mb-4">${product.price}</p>
    
    {/* Botões com espaçamento adequado e animação de hover */}
    <div className="flex justify-between mt-4 space-x-2">
      
      <motion.button
        onClick={() => addToCart(product)} 
        className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        whileHover={{ scale: 1.05 }}  // Aumenta um pouco o botão ao passar o mouse
        whileTap={{ scale: 0.95 }}    // Diminui o botão ao clicar
        transition={{ duration: 0.2 }}
      >
        Adicionar ao Carrinho
      </motion.button>
      <motion.button
        onClick={() => removeFromCart(product.id)} 
        className="w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        whileHover={{ scale: 1.05 }}  // Aumenta um pouco o botão ao passar o mouse
        whileTap={{ scale: 0.95 }}    // Diminui o botão ao clicar
        transition={{ duration: 0.2 }}
      >
        Remover do Carrinho
      </motion.button>
    </div>
  </motion.div>
);
};


export default ProductCard;
