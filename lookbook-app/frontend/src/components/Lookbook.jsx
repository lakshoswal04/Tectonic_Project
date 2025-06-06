import React, { useState, useEffect, useCallback } from 'react';
import { useSwipeable } from 'react-swipeable';
import { looksData } from '../data/looksData';
import MediaViewer from './MediaViewer';
import ProductCard from './ProductCard';

const Lookbook = () => {
  const [currentLookIndex, setCurrentLookIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const currentLook = looksData[currentLookIndex];

  const goToNextLook = useCallback(() => {
    setCurrentLookIndex((prevIndex) => (prevIndex + 1) % looksData.length);
    setSelectedProduct(null); // Close product card on look change
  }, [looksData.length]);

  const goToPrevLook = useCallback(() => {
    setCurrentLookIndex((prevIndex) =>
      prevIndex === 0 ? looksData.length - 1 : prevIndex - 1
    );
    setSelectedProduct(null); // Close product card on look change
  }, [looksData.length]);

  const handleMediaEnd = useCallback(() => {
    if (currentLook.type === 'image') {
      goToNextLook();
    }
  }, [currentLook, goToNextLook]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseProductCard = () => {
    setSelectedProduct(null);
  };

  const handlers = useSwipeable({
    onSwipedUp: goToNextLook,
    onSwipedDown: goToPrevLook,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    <div {...handlers} className="lookbook-container w-full h-screen flex justify-center items-center bg-gray-100 overflow-hidden relative p-4 md:p-8">
      <div className="look-display-area relative w-full h-full md:max-w-3xl lg:max-w-4xl xl:max-w-5xl bg-white shadow-lg flex flex-col justify-center items-center mx-auto">
        {currentLook && (
          <div className="current-look-wrapper w-full h-full relative">
            <MediaViewer
              media={currentLook.media}
              type={currentLook.type}
              onMediaEnd={handleMediaEnd}
              isCurrent={!selectedProduct} // Pause media when product card is open
            />

            {/* Navigation Arrows */}
            <button
              onClick={goToPrevLook}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-60 hover:bg-opacity-80 text-white p-3 rounded-full z-10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75 text-xl md:text-2xl"
              aria-label="Previous Look"
            >
              &lt;
            </button>
            <button
              onClick={goToNextLook}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-60 hover:bg-opacity-80 text-white p-3 rounded-full z-10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75 text-xl md:text-2xl"
              aria-label="Next Look"
            >
              &gt;
            </button>

            {/* Product Annotations */}
            {currentLook.products &&
              currentLook.products.map((product) => (
                <div
                  key={product.id}
                  className="absolute group"
                  style={{
                    left: `${product.annotation.x}%`,
                    top: `${product.annotation.y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <button
                    className="bg-blue-500 rounded-full w-8 h-8 flex items-center justify-center text-white text-sm font-bold cursor-pointer transition-all duration-300 hover:scale-125 hover:bg-blue-600 shadow-lg"
                    onClick={() => handleProductClick(product)}
                  >
                    +
                  </button>
                  <span className="absolute bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -translate-y-full top-0 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    {product.name}
                  </span>
                </div>
              ))}

            {/* View Products Button */}
            <div className="absolute bottom-4 w-full flex justify-center p-4">
              <button
                onClick={() => handleProductClick(currentLook.products[0])}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-full text-lg font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75"
              >
                VIEW PRODUCTS
              </button>
            </div>
          </div>
        )}
      </div>
      {selectedProduct && (
        <ProductCard product={selectedProduct} onClose={handleCloseProductCard} />
      )}
    </div>
  );
};

export default Lookbook;
