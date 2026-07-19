import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import './ProductList.css';
import CartItem from './CartItem';

function ProductList({ useNavigateToHome }) {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);
    const [showCart, setShowCart] = useState(false);

    // Calculate total items dynamically for the navbar badge
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

    const plantsArray = [
        {
            category: "Aromatic Plants",
            plants: [
                { name: "Lavender", image: "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?w=500", description: "Calming aroma, perfect for relaxation.", cost: 15 },
                { name: "Jasmine", image: "https://images.unsplash.com/photo-1508717272800-9fff97da7e8f?w=500", description: "Sweet fragrant blooms that open at night.", cost: 18 },
                { name: "Rosemary", image: "https://images.unsplash.com/photo-1515586838455-8f8f940d6853?w=500", description: "Invigorating herbal scent, great for cooking.", cost: 12 },
                { name: "Mint", image: "https://images.unsplash.com/photo-1603569283847-aa295f0d016a?w=500", description: "Refreshing fragrance, versatile garden staple.", cost: 10 },
                { name: "Eucalyptus", image: "https://images.unsplash.com/photo-1551462147-ff29053bfc14?w=500", description: "Crisp menthol aroma, popular in showers.", cost: 22 },
                { name: "Basil", image: "https://images.unsplash.com/photo-1594489428504-5c0c480a15fd?w=500", description: "Sweet, peppery aroma, essential for kitchens.", cost: 9 }
            ]
        },
        {
            category: "Medicinal Plants",
            plants: [
                { name: "Aloe Vera", image: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=500", description: "Soothing gel properties for skin burns.", cost: 12 },
                { name: "Chamomile", image: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=500", description: "Calming herb used widely in therapeutic teas.", cost: 14 },
                { name: "Calendula", image: "https://images.unsplash.com/photo-1560717789-0ac7c58ac90a?w=500", description: "Bright petals used in healing skin salves.", cost: 11 },
                { name: "Echinacea", image: "https://images.unsplash.com/photo-1569762826621-0045504dbab4?w=500", description: "Known for boosting immune health defenses.", cost: 16 },
                { name: "Lemon Balm", image: "https://images.unsplash.com/photo-1533038590840-1cde6b66b72d?w=500", description: "Reduces stress and promotes deeper sleep.", cost: 13 },
                { name: "Ginger Plant", image: "https://images.unsplash.com/photo-1618164435735-413d3b066c9a?w=500", description: "Spicy roots that help relieve nausea.", cost: 20 }
            ]
        },
        {
            category: "Low Maintenance Plants",
            plants: [
                { name: "Snake Plant", image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=500", description: "Produces oxygen at night, thrives on neglect.", cost: 25 },
                { name: "Cast Iron Plant", image: "https://images.unsplash.com/photo-1592150621744-aca64f48394a?w=500", description: "Hardy, durable, tolerates deep indoor shade.", cost: 20 },
                { name: "ZZ Plant", image: "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?w=500", description: "Glossy leaves that store water efficiently.", cost: 24 },
                { name: "Pothos", image: "https://images.unsplash.com/photo-1596436889106-be35e843f974?w=500", description: "Beautiful trailing vines, fast indoor grower.", cost: 15 },
                { name: "Spider Plant", image: "https://images.unsplash.com/photo-1572688009607-6627f1094090?w=500", description: "Resilient air purifier, sprouts tiny plantlets.", cost: 16 },
                { name: "Succulent Mix", image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=500", description: "Requires minimal watering, loves direct sun.", cost: 12 }
            ]
        }
    ];

    const handleAddToCart = (plant) => {
        dispatch(addItem(plant));
    };

    return (
        <div>
            <nav className="navbar">
                <div className="navbar-logo" onClick={useNavigateToHome}>Paradise Nursery</div>
                <div className="navbar-links">
                    <span onClick={useNavigateToHome}>Home</span>
                    <span className={!showCart ? "active" : ""} onClick={() => setShowCart(false)}>Plants</span>
                    <span onClick={() => setShowCart(true)} className="cart-icon-container">
                        🛒 <span className="cart-badge">{totalItems}</span>
                    </span>
                </div>
            </nav>

            {showCart ? (
                <CartItem 
                    useNavigateToPlants={() => setShowCart(false)} 
                    useNavigateToHome={useNavigateToHome} 
                />
            ) : (
                <div className="product-container">
                    {plantsArray.map((cat, index) => (
                        <div key={index} className="category-section">
                            <h2 className="category-title">{cat.category}</h2>
                            <div className="product-list">
                                {cat.plants.map((plant, pIdx) => {
                                    const isAdded = cartItems.some(item => item.name === plant.name);
                                    return (
                                        <div key={pIdx} className="product-card">
                                            <img src={plant.image} alt={plant.name} className="product-image" />
                                            <h3 className="product-title">{plant.name}</h3>
                                            <p className="product-description">{plant.description}</p>
                                            <p className="price">${plant.cost}</p>
                                            <button 
                                                disabled={isAdded} 
                                                onClick={() => handleAddToCart(plant)}
                                                className="add-to-cart-btn"
                                            >
                                                {isAdded ? "Added to Cart" : "Add to Cart"}
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ProductList;
