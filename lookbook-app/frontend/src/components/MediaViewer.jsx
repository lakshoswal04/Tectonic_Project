import React, { useState, useEffect, useRef } from 'react';

const MediaViewer = ({ media, type, onMediaEnd, isCurrent }) => {
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    setProgress(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (type === 'image' && isCurrent) {
      intervalRef.current = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(intervalRef.current);
            onMediaEnd();
            return 100;
          }
          return prevProgress + (100 / 50); // 100% in 5 seconds (50 * 100ms)
        });
      }, 100);
    } else if (type === 'video' && videoRef.current) {
      if (isCurrent) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [media, type, onMediaEnd, isCurrent]);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <div className="relative w-full h-full">
      {type === 'image' && (
        <>
          <img src={media} alt="Look" className="w-full h-full object-cover" />
          {isCurrent && (
            <div className="absolute bottom-0 left-0 w-full bg-gray-300 h-1">
              <div
                className="bg-blue-500 h-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          )}
        </>
      )}
      {type === 'video' && (
        <div className="relative w-full h-full">
          <video
            ref={videoRef}
            src={media}
            className="w-full h-full object-cover"
            loop
            playsInline
            muted={isMuted}
            onEnded={onMediaEnd} // For videos that might not loop indefinitely
          />
          <button
            onClick={toggleMute}
            className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full"
          >
            {isMuted ? 'Unmute' : 'Mute'}
          </button>
        </div>
      )}
    </div>
  );
};

export default MediaViewer;
