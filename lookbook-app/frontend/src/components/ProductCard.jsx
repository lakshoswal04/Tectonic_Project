import React, { useState } from 'react';

const ProductCard = ({ product, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!product) return null;

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.imageUrls.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      (prevIndex + 1) % product.imageUrls.length
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4 animate-fade-in">
      <div className="bg-white p-6 rounded-lg shadow-2xl max-w-sm w-full relative transform transition-all duration-300 scale-100 opacity-100 animate-slide-up">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-gray-100 rounded-full p-2 text-gray-600 hover:bg-gray-200 transition-colors duration-200 z-10 shadow-md"
          aria-label="Close product card"
        >
          &times;
        </button>

        <div className="relative mb-4">
          <img
            src={product.imageUrls[currentImageIndex]}
            alt={product.name}
            className="w-full h-48 object-cover rounded-lg shadow-inner mb-2"
          />
          {product.imageUrls.length > 1 && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-60 text-white p-2 rounded-full hover:bg-opacity-80 transition-opacity duration-200"
                aria-label="Previous image"
              >
                &lt;
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-60 text-white p-2 rounded-full hover:bg-opacity-80 transition-opacity duration-200"
                aria-label="Next image"
              >
                &gt;
              </button>
              <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-1">
                {product.imageUrls.map((_, idx) => (
                  <span
                    key={idx}
                    className={`block w-2 h-2 rounded-full ${
                      currentImageIndex === idx ? 'bg-white' : 'bg-gray-400'
                    }`}
                  ></span>
                ))}
              </div>
            </>
          )}
        </div>

        <h2 className="text-xl font-bold mb-2">{product.name}</h2>
        <p className="text-gray-700 mb-4">{product.price}</p>
        <div className="flex justify-around items-center mb-4">
          <button className="flex items-center space-x-1 text-gray-600 hover:text-red-500 transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 22.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span>Like</span>
          </button>
          <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-500 transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6.632L15.316 10m5.854-1.24a2 2 0 11-.708-.708L22.5 5.5 10.5 17.5 7.5 14.5 4.5 17.5 1.5 14.5 5.5 10.5 1.5 7.5 4.5 4.5 7.5 1.5 10.5 4.5 14.5 1.5 17.5 4.5 22.5 5.5z" />
            </svg>
            <span>Share</span>
          </button>
        </div>
        <a
          href={product.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg"
        >
          Shop Now
        </a>
      </div>
    </div>
  );
};

export default ProductCard;
