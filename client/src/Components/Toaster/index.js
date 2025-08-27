import React from 'react';
import { Toaster } from 'react-hot-toast'; // Import the Toaster
import AllProducts from './Components/AllProducts'; // Assuming this is your main page

function App() {
  return (
    <div className="App">
      <Toaster 
        position="top-center" // This positions the toast at the top center
        reverseOrder={false}
      />
      <AllProducts />
    </div>
  );
}

export default App;