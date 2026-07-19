import React, { useState } from 'react';
import './App.css';
import ProductList from './ProductList';
import AboutUs from './AboutUs';

function App() {
  const [showProductList, setShowProductList] = useState(false);

  const handleStartClicked = () => {
    setShowProductList(true);
  };

  return (
    <div className="app-container">
      <div className={`landing-page ${showProductList ? 'fade-out' : ''}`}>
        <div className="background-image"></div>
        <div className="content">
          <div className="landing_content">
            <h1>Paradise Nursery</h1>
            <div className="divider"></div>
            <p>Welcome to Paradise Nursery, where green dreams come true!</p>
            <button className="get-started-btn" onClick={handleStartClicked}>
              Get Started
            </button>
          </div>
          <div className="aboutus_container">
            <AboutUs />
          </div>
        </div>
      </div>
      
      {showProductList && (
        <div className="product-list-container">
          <ProductList 
            useNavigateToHome={() => setShowProductList(false)} 
          />
        </div>
      )}
    </div>
  );
}

export default App;


