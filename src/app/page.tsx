"use client";

import { InfiniteScroll } from '../app/components/InfiniteScroll';

const Home = () => {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Bem-vindo à Caveo Store!</h1>
      <p className="text-lg">Confira os nossos produtos:</p>
      
      <InfiniteScroll />
    </main>
  );
};

export default Home;
