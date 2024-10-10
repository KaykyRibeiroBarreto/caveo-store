
"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const Navbar = ({ darkMode, toggleDarkMode }: NavbarProps) => {
  const [cartItems] = useState(0); 
  return (
    <nav className={`${darkMode ? 'bg-slate-900 text-white' : 'bg-slate-100 text-black'} p-4`}>
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold">Caveo Store</h1>
        <div className="flex-grow flex justify-center items-center space-x-2">
          <input
            type="text"
            placeholder="Procurar..."
            className={`${darkMode ? 'bg-slate-800 text-white' : 'bg-slate-200 text-black'} p-2 py-2 rounded-md focus:outline-none`}
          />
          <button className={`${darkMode ? 'bg-slate-800 text-white' : 'bg-slate-200 text-black'} px-4 py-2 rounded-md`}>Procurar</button>
          <div className="flex items-center space-x-4">
            <span className={`${darkMode ? 'text-white' : 'text-gray-700 hover:underline'}`}>🔔</span>
            <span className={`${darkMode ? 'text-white' : 'text-gray-700 hover:underline'}`}> ...</span>
            <motion.div className="relative">
              <span className={`${darkMode ? 'text-white' : 'text-gray-700 hover:underline'}`}>
                🛒
              </span>
              {cartItems > 0 && (
                <motion.span
                  className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full px-2 text-xs"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {cartItems}
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
      <div className="container mx-auto flex justify-center space-x-6 mt-4">
        <a href="#" className={`${darkMode ? 'text-white hover:underline' : 'text-gray-700 hover:underline'}`}>Roupas Masculinas</a>
        <a href="#" className={`${darkMode ? 'text-white hover:underline' : 'text-gray-700 hover:underline'}`}>Joias</a>
        <a href="#" className={`${darkMode ? 'text-white hover:underline' : 'text-gray-700 hover:underline'}`}>Eletrônica</a>
        <a href="#" className={`${darkMode ? 'text-white hover:underline' : 'text-gray-700 hover:underline'}`}>Roupas Femininas</a>
      </div>
    </nav>
  );
};
