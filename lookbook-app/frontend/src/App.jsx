import { useState, useEffect } from 'react';
import Lookbook from './components/Lookbook';
import Navbar from './components/Navbar';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 font-poppins">
      {isLoading ? (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-r from-fashion-purple to-fashion-pink">
          <div className="w-24 h-24 border-4 border-white rounded-full border-t-transparent animate-rotate-slow mb-4"></div>
          <h1 className="text-white text-2xl font-bold animate-pulse-slow">FASHION LOOKBOOK</h1>
        </div>
      ) : (
        <>
          <Navbar />
          <div className="pt-16"> {/* Add padding top to account for fixed navbar */}
            <Lookbook />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
