import React, { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-fashion-purple to-fashion-pink p-4 fixed w-full top-0 z-40 shadow-xl">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold tracking-wider flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          FASHION LOOKBOOK
        </div>
        <ul className="hidden md:flex space-x-6">
          <li><a href="#home" className="text-white hover:text-gray-200 text-lg transition-colors duration-300 font-medium">Home</a></li>
          <li><a href="#looks" className="text-white hover:text-gray-200 text-lg transition-colors duration-300 font-medium">Looks</a></li>
          <li><a href="#shop" className="text-white hover:text-gray-200 text-lg transition-colors duration-300 font-medium">Shop</a></li>
          <li><a href="#contact" className="text-white hover:text-gray-200 text-lg transition-colors duration-300 font-medium">Contact</a></li>
        </ul>
        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gradient-to-b from-fashion-purple to-fashion-pink animate-fade-in">
          <ul className="flex flex-col space-y-4 p-4">
            <li><a href="#home" className="text-white hover:text-gray-200 text-lg transition-colors duration-300 block py-2">Home</a></li>
            <li><a href="#looks" className="text-white hover:text-gray-200 text-lg transition-colors duration-300 block py-2">Looks</a></li>
            <li><a href="#shop" className="text-white hover:text-gray-200 text-lg transition-colors duration-300 block py-2">Shop</a></li>
            <li><a href="#contact" className="text-white hover:text-gray-200 text-lg transition-colors duration-300 block py-2">Contact</a></li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
