"use client"

import './globals.css'; 
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';
import { Navbar } from './components/Navbar';

const ClientLayout = ({ children }: { children: ReactNode }) => {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`${darkMode ? 'bg-slate-900 text-white' : 'bg-gray-50  text-black'} min-h-screen transition-colors duration-300 ease-in-out`}>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      {children}
    </div>
  );
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (

    <QueryClientProvider client={queryClient}>
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  </QueryClientProvider>
  );
}


