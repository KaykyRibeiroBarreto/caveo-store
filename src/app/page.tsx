"use client";


import { useState } from 'react';
import { Navbar } from './components/Navbar'; 
import Link from 'next/link';
import {InfiniteScroll} from '../app/components/InfiniteScroll';
import { fetchProducts } from '../app/domain/api/product'; 




const Home = () => {
  const [darkMode, setDarkMode] = useState(false);
  
    const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    };
   return (

    <div className={`${darkMode ? 'bg-slate-900 text-white' : 'bg-gray-50 text-black'} min-h-screen transition-colors duration-300 ease-in-out`}>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
    
      <main className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-4">Bem-vindo à Caveo Store!</h1>
        <p className="text-lg">Confira os nossos produtos:</p>
        
        <InfiniteScroll />
      </main>
    </div>
  );
};

export default Home;