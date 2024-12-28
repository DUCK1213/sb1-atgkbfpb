import React from 'react';

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-500 text-white p-4">
        <h1 className="text-lg font-bold">Professional Networking App</h1>
      </header>
      <main className="flex-grow p-4">
        <div className="max-w-4xl mx-auto">{children}</div>
      </main>
      <footer className="bg-gray-200 text-center p-2 text-sm">
        &copy; 2024 Networking App. All rights reserved.
      </footer>
    </div>
  );
};
