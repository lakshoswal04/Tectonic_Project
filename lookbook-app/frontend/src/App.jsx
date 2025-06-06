import { useState } from 'react';
import Lookbook from './components/Lookbook';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Lookbook />
    </div>
  );
}

export default App;
