import React from 'react';
import Link from 'next/link';

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white p-6 h-screen">
      <h2 className="text-2xl font-semibold mb-8">Maestro AI</h2>
      <ul>
        <li>
          <Link href="/dashboard" className="block py-2 hover:bg-gray-700 rounded">Dashboard</Link>
        </li>
        <li>
          <Link href="/settings" className="block py-2 hover:bg-gray-700 rounded">Settings</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
