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
    <div {...handlers} className="lookbook-container w-full h-screen flex justify-center items-center bg-gray-100 overflow-hidden relative">
      <div className="look-display-area relative w-full h-full max-w-md bg-white shadow-lg flex flex-col justify-center items-center">
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
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10"
            >
              &lt;
            </button>
            <button
              onClick={goToNextLook}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10"
            >
              &gt;
            </button>

            {/* Product Annotations */}
            {currentLook.products &&
              currentLook.products.map((product) => (
                <div
                  key={product.id}
                  className="absolute bg-blue-500 rounded-full w-6 h-6 flex items-center justify-center text-white text-xs cursor-pointer"
                  style={{
                    left: `${product.annotation.x}%`,
                    top: `${product.annotation.y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  onClick={() => handleProductClick(product)}
                >
                  .
                </div>
              ))}

            {/* View Products Button */}
            <div className="absolute bottom-4 w-full flex justify-center">
              <button
                onClick={() => handleProductClick(currentLook.products[0])} // Example: show first product
                className="bg-green-500 text-white px-6 py-3 rounded-lg text-lg font-semibold"
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
