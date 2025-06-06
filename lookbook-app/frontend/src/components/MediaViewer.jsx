import React, { useState, useEffect, useRef } from 'react';

const MediaViewer = ({ media, onMediaEnd, isCurrent }) => {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const intervalRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [liked, setLiked] = useState(false);

  // Remove video-related states and refs.

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

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

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
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  const renderErrorState = () => (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 p-4 text-center">
      <div className="text-red-500 mb-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <p className="text-gray-700">Failed to load media</p>
    </div>
  );

  const renderProgressBar = () => (
    <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-gray-200 to-gray-300 rounded-b-lg overflow-hidden shadow-inner">
      <div
        className="h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-100 ease-linear rounded-b-lg"
        style={{ width: `${progress}%` }}
      />
    </div>
  );

  return (
    <div
      className="relative w-full h-full flex items-center justify-center p-2 sm:p-6"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden w-full max-w-2xl aspect-video flex items-center justify-center transition-transform duration-300 hover:scale-[1.02]">
        {isLoading && renderLoadingState()}
        {hasError && renderErrorState()}
        {!hasError && (
          <>
            <img
              src={media}
              alt="Look"
              className={`w-full h-full object-cover transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
              onLoad={() => setIsLoading(false)}
              onError={handleImageError}
              style={{ minHeight: 200 }}
            />
            {/* Like/Share Buttons Overlay */}
            <div className={`absolute top-4 right-4 flex space-x-3 z-10 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-80'}`}>
              <button
                onClick={handleLike}
                className={`bg-white/80 hover:bg-pink-100 border border-pink-200 shadow p-2 rounded-full flex items-center transition-colors duration-200 ${liked ? 'text-pink-500' : 'text-gray-500'}`}
                aria-label="Like this post"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill={liked ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318C5.89 4.746 8.118 4.746 9.69 6.318l1.31 1.31 1.31-1.31c1.572-1.572 3.8-1.572 5.372 0 1.572 1.572 1.572 3.8 0 5.372L12 20.364l-6.372-8.674c-1.572-1.572-1.572-3.8 0-5.372z" />
                </svg>
              </button>
              <button
                onClick={handleShare}
                className="bg-white/80 hover:bg-blue-100 border border-blue-200 shadow p-2 rounded-full flex items-center text-blue-500 transition-colors duration-200"
                aria-label="Share this post"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12v.01M8 12v.01M12 12v.01M16 12v.01M20 12v.01" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8V6a4 4 0 00-8 0v2" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 16v6" />
                </svg>
              </button>
            </div>
            {isCurrent && renderProgressBar()}
          </>
        )}
      </div>
    </div>
  );
}

export default MediaViewer;
