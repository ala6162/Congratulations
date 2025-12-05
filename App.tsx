import React from 'react';
import { Celebration } from './components/Celebration';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-rose-50 p-6 relative overflow-hidden">
      {/* Romantic background ambience */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob"></div>
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-10%] left-[20%] w-96 h-96 bg-peach-200 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-4000 bg-orange-100"></div>
      
      {/* Floating particles/hearts could go here, but keeping it clean for now */}
      
      <main className="relative z-10 w-full max-w-lg">
        <Celebration />
      </main>
    </div>
  );
};

export default App;