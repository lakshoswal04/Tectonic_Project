import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 fixed w-full top-0 z-40 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">Fashion Lookbook</div>
        <ul className="flex space-x-4">
          <li><a href="#home" className="text-gray-300 hover:text-white text-lg">Home</a></li>
          <li><a href="#looks" className="text-gray-300 hover:text-white text-lg">Looks</a></li>
          <li><a href="#shop" className="text-gray-300 hover:text-white text-lg">Shop</a></li>
          <li><a href="#contact" className="text-gray-300 hover:text-white text-lg">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
