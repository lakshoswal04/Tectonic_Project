import React, { useState } from 'react';

const ProductCard = ({ product, onClose }) => {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [showAddedMessage, setShowAddedMessage] = useState(false);

  if (!product) return null;

  const handleAddToCart = () => {
    setIsAddingToCart(true);
    // Simulate API call
    setTimeout(() => {
      setIsAddingToCart(false);
      setShowAddedMessage(true);
      setTimeout(() => setShowAddedMessage(false), 2000);
    }, 1000);
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-fade-in">
      <div className="bg-white p-6 rounded-xl shadow-2xl max-w-sm w-full relative transform transition-all duration-300 scale-100 opacity-100 animate-slide-up">
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 bg-white rounded-full p-2 text-gray-600 hover:bg-gray-200 transition-colors duration-200 z-10 shadow-md"
          aria-label="Close product card"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>

        <div className="relative mb-4 rounded-lg overflow-hidden group h-64">
          <img
            src={product.imageUrls[0]}
            alt={product.name}
            className="w-full h-full object-cover rounded-lg shadow-inner transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Product badge */}
          <div className="absolute top-2 left-2 bg-fashion-pink text-white text-xs font-bold px-2 py-1 rounded-md">
            NEW IN
          </div>
        </div>

        <h2 className="text-xl font-bold mb-1 text-gray-800">{product.name}</h2>
        <p className="text-2xl font-bold mb-2 text-fashion-pink">{product.price}</p>
        
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-gray-600 ml-2 text-sm">(42 reviews)</span>
          </div>
          
          <p className="text-sm text-gray-600 mb-3">Select Size:</p>
          <div className="flex space-x-2 mb-4">
            {['S', 'M', 'L', 'XL'].map((size) => (
              <button 
                key={size} 
                className={`border rounded-md px-3 py-1 text-sm transition-colors duration-200 ${selectedSize === size ? 'border-fashion-pink bg-fashion-pink/10 text-fashion-pink' : 'border-gray-300 hover:border-fashion-pink hover:text-fashion-pink'}`}
                onClick={() => handleSizeSelect(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <button 
            className="flex items-center space-x-1 text-gray-600 hover:text-fashion-pink transition-colors duration-200 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg"
            aria-label="Add to wishlist"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 22.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span>Save</span>
          </button>
          <button 
            className="flex items-center space-x-1 text-gray-600 hover:text-fashion-purple transition-colors duration-200 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg"
            aria-label="Share product"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6.632L15.316 10m5.854-1.24a2 2 0 11-.708-.708L22.5 5.5 10.5 17.5 7.5 14.5 4.5 17.5 1.5 14.5 5.5 10.5 1.5 7.5 4.5 4.5 7.5 1.5 10.5 4.5 14.5 1.5 17.5 4.5 22.5 5.5z" />
            </svg>
            <span>Share</span>
          </button>
        </div>
        
        <div className="relative">
          {showAddedMessage && (
            <div className="absolute -top-10 left-0 right-0 bg-green-100 text-green-800 text-center py-2 rounded-lg animate-fade-in">
              Added to cart successfully!
            </div>
          )}
          <div className="flex space-x-2">
            <button
              onClick={handleAddToCart}
              disabled={isAddingToCart || !selectedSize}
              className={`flex-1 text-white text-center py-3 rounded-lg transition-all duration-300 font-semibold shadow-lg flex justify-center items-center ${selectedSize ? 'bg-gradient-to-r from-fashion-pink to-fashion-purple hover:from-pink-600 hover:to-purple-700' : 'bg-gray-400 cursor-not-allowed'}`}
            >
              {isAddingToCart ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                'Add to Cart'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
