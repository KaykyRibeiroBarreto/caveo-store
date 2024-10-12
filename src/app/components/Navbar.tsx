
"use client";
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCartStore } from '../domain/services/cartStore';

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const Navbar = ({ darkMode, toggleDarkMode }: NavbarProps) => {
  const { items } = useCartStore();  // Acessando os itens do carrinho
  const cartItemsCount = items.reduce((acc, item) => acc + item.quantity, 0);
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  return (
    <nav className={`${darkMode ? 'bg-slate-900 text-white' : 'bg-slate-100 text-black'} p-4 fixed top-0 left-0 w-full z-50 shadow-md`}>
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold">Caveo Store</h1>
        <button
          className="md:hidden block text-2xl"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          ☰
        </button>

        <div className={`md:flex flex-grow flex justify-center items-center space-x-2  ${isMobileMenuOpen ? 'hidden' : ''}`}>
            <input
              type="text"
              placeholder="Procurar..."
              className={`${darkMode ? 'bg-slate-800 text-white' : 'bg-slate-200 text-black'} p-2 py-2 rounded-md focus:outline-none`}
            />
          <button className={`${darkMode ? 'bg-slate-800 text-white' : 'bg-slate-200 text-black'} px-4 py-2 rounded-md`}>Procurar</button>
          <div className="flex items-center space-x-4">
            <span className={`${darkMode ? 'text-white' : 'text-gray-700 hover:underline'}`}>🔔</span>
            <span className={`${darkMode ? 'text-white' : 'text-gray-700 hover:underline'}`}> ...</span>
            <motion.div className="relative cursor-pointer">
                <Link href="/Cart">
                   <span className={`${darkMode ? 'text-white' : 'text-gray-700 hover:underline'}`}>
                   🛒
                  </span>
              </Link>
           {cartItemsCount > 0 && (
             <motion.span
               className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full px-2 text-xs"
                initial={{ scale: 0 }}
                 animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {cartItemsCount}
                </motion.span>
              )}
            </motion.div>
          </div>
          <motion.button
            onClick={toggleDarkMode}
            className={`ml-4 ${darkMode ? 'bg-slate-50 text-black' : 'bg-slate-900 text-white'} px-4 py-2 rounded-md`}
            whileHover={{ scale: 1.05 }} // Animação ao passar o mouse
            whileTap={{ scale: 0.95 }} // Animação ao clicar
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </motion.button>
        </div>
      </div>
      <div className="container mx-auto flex justify-center space-x-6 mt-4 hidden md:flex">
        <a href="#" className={`${darkMode ? 'text-white hover:underline' : 'text-gray-700 hover:underline'}`}>Roupas Masculinas</a>
        <a href="#" className={`${darkMode ? 'text-white hover:underline' : 'text-gray-700 hover:underline'}`}>Joias</a>
        <a href="#" className={`${darkMode ? 'text-white hover:underline' : 'text-gray-700 hover:underline'}`}>Eletrônica</a>
        <a href="#" className={`${darkMode ? 'text-white hover:underline' : 'text-gray-700 hover:underline'}`}>Roupas Femininas</a>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden flex flex-col items-center mt-4 space-y-4">
          <input
            type="text"
            placeholder="Procurar..."
            className={`${darkMode ? 'bg-slate-800 text-white' : 'bg-slate-200 text-black'} p-2 py-2 rounded-md focus:outline-none`}
          />
          <button className={`${darkMode ? 'bg-slate-800 text-white' : 'bg-slate-200 text-black'} px-4 py-2 rounded-md`}>
            Procurar
          </button>
          <Link href="#" className={`${darkMode ? 'text-white hover:underline' : 'text-gray-700 hover:underline'}`}>
            Roupas Masculinas
          </Link>
          <Link href="#" className={`${darkMode ? 'text-white hover:underline' : 'text-gray-700 hover:underline'}`}>
            Joias
          </Link>
          <Link href="#" className={`${darkMode ? 'text-white hover:underline' : 'text-gray-700 hover:underline'}`}>
            Eletrônica
          </Link>
          <Link href="#" className={`${darkMode ? 'text-white hover:underline' : 'text-gray-700 hover:underline'}`}>
            Roupas Femininas
          </Link>
        </div>
      )}
    </nav>
  );
};
