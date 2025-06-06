import React from 'react';

const ProductCard = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-gray-200 rounded-full p-2 text-gray-700 hover:bg-gray-300"
        >
          &times;
        </button>
        <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover rounded-md mb-4" />
        <h2 className="text-xl font-bold mb-2">{product.name}</h2>
        <p className="text-gray-700 mb-4">{product.price}</p>
        <a
          href={product.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-blue-500 text-white text-center py-2 rounded-md hover:bg-blue-600"
        >
          Shop Now
        </a>
      </div>
    </div>
  );
};

export default ProductCard;
