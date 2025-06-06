import React, { useState, useEffect, useRef } from 'react';

const MediaViewer = ({ media, angles, currentAngleIndex, onMediaEnd, isCurrent, onAngleChange }) => {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [liked, setLiked] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    setProgress(0);
    setIsLoading(true);
    setHasError(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (isCurrent) {
      const img = new Image();
      img.src = media;
      img.onload = () => {
        setIsLoading(false);
        // 5 second timer for images (50 intervals of 100ms)
        intervalRef.current = setInterval(() => {
          setProgress((prevProgress) => {
            if (prevProgress >= 100) {
              clearInterval(intervalRef.current);
              setTimeout(() => {
                onMediaEnd();
              }, 300);
              return 100;
            }
            return prevProgress + (100 / 50);
          });
        }, 100);
      };
      img.onerror = () => {
        setIsLoading(false);
        setHasError(true);
      };
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [media, onMediaEnd, isCurrent]);

  const handleImageError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const handleLike = () => setLiked((prev) => !prev);
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ url: window.location.href, title: 'Check out this look!' });
    } else {
      window.prompt('Copy and share this link:', window.location.href);
    }
  };

  const renderLoadingState = () => (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-fashion-pink"></div>
    </div>
  );

  const renderErrorState = () => (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 p-4 text-center">
      <div className="text-red-500 mb-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <p className="text-gray-700">Failed to load image</p>
    </div>
  );

  const renderProgressBar = () => (
    <div className="absolute top-2 left-2 right-2 flex space-x-1 z-20">
      {angles.map((_, idx) => (
        <div key={idx} className="h-1.5 bg-white/30 rounded-full flex-1 overflow-hidden">
          {idx === currentAngleIndex && (
            <div 
              className="h-full bg-white transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
          )}
          {idx < currentAngleIndex && (
            <div className="h-full bg-white w-full" />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div
      className="relative w-full h-full flex items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative bg-black overflow-hidden w-full h-full flex items-center justify-center">
        {isLoading && renderLoadingState()}
        {hasError && renderErrorState()}
        {!hasError && (
          <>
            <img
              src={media}
              alt="Look"
              className="w-full h-full object-contain md:object-cover transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}"
              onLoad={() => setIsLoading(false)}
              onError={handleImageError}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          </>
        )}
        
        {/* Like/Share Buttons Overlay */}
        <div className={`absolute top-14 right-4 flex space-x-3 z-10 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <button
            onClick={handleLike}
            className={`bg-white/80 hover:bg-fashion-pink hover:text-white border border-pink-200 shadow p-2 rounded-full flex items-center transition-all duration-200 ${liked ? 'text-white bg-fashion-pink' : 'text-gray-500'} backdrop-blur-sm`}
            aria-label="Like this look"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill={liked ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318C5.89 4.746 8.118 4.746 9.69 6.318l1.31 1.31 1.31-1.31c1.572-1.572 3.8-1.572 5.372 0 1.572 1.572 1.572 3.8 0 5.372L12 20.364l-6.372-8.674c-1.572-1.572-1.572-3.8 0-5.372z" />
            </svg>
          </button>
          <button
            onClick={handleShare}
            className="bg-white/80 hover:bg-fashion-purple hover:text-white border border-purple-200 shadow p-2 rounded-full flex items-center text-gray-500 hover:text-white transition-all duration-200 backdrop-blur-sm"
            aria-label="Share this look"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6.632L15.316 10m5.854-1.24a2 2 0 11-.708-.708L22.5 5.5 10.5 17.5 7.5 14.5 4.5 17.5 1.5 14.5 5.5 10.5 1.5 7.5 4.5 4.5 7.5 1.5 10.5 4.5 14.5 1.5 17.5 4.5 22.5 5.5z" />
            </svg>
          </button>
        </div>
        {isCurrent && renderProgressBar()}
      </div>
    </div>
  );
}

export default MediaViewer;
