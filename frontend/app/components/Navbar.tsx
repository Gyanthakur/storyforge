import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="flex justify-between items-center">
        <div className="text-white text-xl font-bold">Maestro AI</div>
        <div className="space-x-4">
          <Link href="/" className="text-white">Home</Link>
          <Link href="/dashboard" className="text-white">Dashboard</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
