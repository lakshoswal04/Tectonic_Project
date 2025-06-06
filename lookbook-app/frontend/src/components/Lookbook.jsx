import React, { useState, useEffect, useCallback } from 'react';
import { useSwipeable } from 'react-swipeable';
import { looksData } from '../data/looksData';
import MediaViewer from './MediaViewer';
import ProductCard from './ProductCard';

const Lookbook = () => {
  const [currentLookIndex, setCurrentLookIndex] = useState(0);
  const [currentAngleIndex, setCurrentAngleIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showTutorial, setShowTutorial] = useState(true);
  const currentLook = looksData[currentLookIndex];

  // Hide tutorial after 5 seconds
  useEffect(() => {
    if (showTutorial) {
      const timer = setTimeout(() => setShowTutorial(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showTutorial]);

  // Reset angle index when changing looks
  useEffect(() => {
    setCurrentAngleIndex(0);
  }, [currentLookIndex]);

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

  const goToNextAngle = useCallback(() => {
    if (currentLook && currentLook.angles) {
      setCurrentAngleIndex((prevIndex) => 
        (prevIndex + 1) % currentLook.angles.length
      );
    }
  }, [currentLook]);

  const goToPrevAngle = useCallback(() => {
    if (currentLook && currentLook.angles) {
      setCurrentAngleIndex((prevIndex) => 
        prevIndex === 0 ? currentLook.angles.length - 1 : prevIndex - 1
      );
    }
  }, [currentLook]);

  const handleMediaEnd = useCallback(() => {
    goToNextLook();
  }, [goToNextLook]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseProductCard = () => {
    setSelectedProduct(null);
  };

  // Handle vertical swipes for changing looks
  const verticalHandlers = useSwipeable({
    onSwipedUp: goToNextLook,
    onSwipedDown: goToPrevLook,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  // Handle horizontal swipes for changing angles
  const horizontalHandlers = useSwipeable({
    onSwipedLeft: goToNextAngle,
    onSwipedRight: goToPrevAngle,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowUp':
          goToPrevLook();
          break;
        case 'ArrowDown':
          goToNextLook();
          break;
        case 'ArrowLeft':
          goToPrevAngle();
          break;
        case 'ArrowRight':
          goToNextAngle();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNextLook, goToPrevLook, goToNextAngle, goToPrevAngle]);

  // Combine handlers
  const getHandlerProps = () => {
    return {
      ...verticalHandlers.handlers,
      ...horizontalHandlers.handlers,
    };
  };

  return (
    <div {...getHandlerProps()} className="lookbook-container w-full h-screen flex justify-center items-center bg-gradient-to-b from-gray-50 to-gray-100 overflow-hidden relative p-4 md:p-8">
      {/* Look Preview Thumbnails */}
      <div className="absolute top-20 left-4 z-30 hidden md:flex flex-col space-y-3 p-2 bg-white/30 backdrop-blur-md rounded-xl shadow-lg">
        {looksData.map((look, index) => (
          <button
            key={look.id}
            onClick={() => setCurrentLookIndex(index)}
            className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${index === currentLookIndex ? 'border-fashion-pink scale-110 shadow-lg' : 'border-white/50 opacity-70 hover:opacity-100'}`}
          >
            <img src={look.media} alt={`Look ${index + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
      
      {/* Angle Preview Thumbnails */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 flex space-x-2 p-2">
        {currentLook && currentLook.angles && currentLook.angles.map((angle, index) => (
          <button
            key={`angle-${index}`}
            onClick={() => setCurrentAngleIndex(index)}
            className={`w-10 h-10 rounded-full overflow-hidden border-2 transition-all duration-300 ${index === currentAngleIndex ? 'border-fashion-pink scale-110 shadow-lg' : 'border-white/50 opacity-70 hover:opacity-100'}`}
          >
            <img src={angle} alt={`Angle ${index + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
      
      <div className="look-display-area relative w-full h-full md:max-w-4xl lg:max-w-5xl xl:max-w-6xl bg-black shadow-2xl rounded-xl flex flex-col justify-center items-center mx-auto overflow-hidden">
        {currentLook && (
          <div className="current-look-wrapper w-full h-full relative">
            <MediaViewer
              media={currentLook.angles ? currentLook.angles[currentAngleIndex] : currentLook.media}
              angles={currentLook.angles || [currentLook.media]}
              currentAngleIndex={currentAngleIndex}
              onMediaEnd={handleMediaEnd}
              isCurrent={!selectedProduct} // Pause media when product card is open
              onAngleChange={setCurrentAngleIndex}
            />

            {/* Navigation Arrows - Vertical (Looks) */}
            <button
              onClick={goToPrevLook}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-fashion-pink text-white p-3 rounded-full z-10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75 text-xl md:text-2xl backdrop-blur-sm animate-float"
              aria-label="Previous Look"
            >
              ↑
            </button>
            <button
              onClick={goToNextLook}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-fashion-pink text-white p-3 rounded-full z-10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75 text-xl md:text-2xl backdrop-blur-sm animate-float"
              aria-label="Next Look"
            >
              ↓
            </button>

            {/* Navigation Arrows - Horizontal (Angles) */}
            <button
              onClick={goToPrevAngle}
              className="absolute left-1/2 top-4 -translate-x-16 bg-black/30 hover:bg-fashion-purple text-white p-3 rounded-full z-10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75 text-xl md:text-2xl backdrop-blur-sm"
              aria-label="Previous Angle"
            >
              ←
            </button>
            <button
              onClick={goToNextAngle}
              className="absolute left-1/2 top-4 translate-x-4 bg-black/30 hover:bg-fashion-purple text-white p-3 rounded-full z-10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75 text-xl md:text-2xl backdrop-blur-sm"
              aria-label="Next Angle"
            >
              →
            </button>

            {/* Swipe Indicators */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 h-24 w-1 bg-white/20 rounded-full overflow-hidden">
              <div className="w-full h-1/2 bg-fashion-pink animate-pulse-slow rounded-full"></div>
            </div>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 h-24 w-1 bg-white/20 rounded-full overflow-hidden">
              <div className="w-full h-1/2 bg-fashion-pink animate-pulse-slow rounded-full transform rotate-180"></div>
            </div>

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
                    className="bg-gradient-to-r from-fashion-pink to-fashion-purple rounded-full w-10 h-10 flex items-center justify-center text-white text-sm font-bold cursor-pointer transition-all duration-300 hover:scale-125 hover:shadow-lg shadow-md animate-pulse-slow"
                    onClick={() => handleProductClick(product)}
                  >
                    +
                  </button>
                  <span className="absolute bg-black/75 text-white text-xs px-3 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -translate-y-full top-0 left-1/2 -translate-x-1/2 whitespace-nowrap backdrop-blur-sm font-medium min-w-max">
                    {product.name}
                  </span>
                </div>
              ))}

            {/* View Products Button */}
            <div className="absolute bottom-4 w-full flex justify-center p-4">
              <button
                onClick={() => handleProductClick(currentLook.products[0])}
                className="bg-gradient-to-r from-fashion-pink to-fashion-purple text-white px-8 py-3 rounded-full text-lg font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 animate-float"
              >
                SHOP THIS LOOK
              </button>
            </div>
            
            {/* Swipe Tutorial Overlay - shows only initially */}
            {showTutorial && (
              <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center z-50 backdrop-blur-sm">
                <div className="text-white text-center p-6 max-w-md">
                  <h3 className="text-2xl font-bold mb-4">How to Navigate</h3>
                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div className="flex flex-col items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                      </svg>
                      <p>Swipe right for previous angle</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                      <p>Swipe left for next angle</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 11l7-7 7 7M5 19l7-7 7 7" />
                      </svg>
                      <p>Swipe up for previous look</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
                      </svg>
                      <p>Swipe down for next look</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowTutorial(false)}
                    className="bg-gradient-to-r from-fashion-pink to-fashion-purple text-white px-6 py-2 rounded-full font-bold hover:opacity-90 transition-opacity duration-300"
                  >
                    Got it!
                  </button>
                </div>
              </div>
            )}
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
