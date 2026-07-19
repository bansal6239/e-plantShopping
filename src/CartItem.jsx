import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

function CartItem({ useNavigateToPlants, useNavigateToHome }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Calculates the total cost of all plants in the cart
  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => total + (item.cost * item.quantity), 0);
  };

  // Calculates subtotal cost per plant item card row
  const calculateTotalCost = (item) => {
    return item.cost * item.quantity;
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (itemName) => {
    dispatch(removeItem(itemName));
  };

  const handleCheckout = () => {
    alert("Checkout functionality coming soon!");
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">Shopping Cart Details</h2>
      <h3 className="cart-summary-text">Total Items: {totalItems}</h3>
      <h3 className="cart-summary-text">Total Amount: ${calculateTotalAmount()}</h3>

      <div className="cart-items-list">
        {cartItems.map((item, index) => (
          <div key={index} className="cart-item-card">
            <img src={item.image} alt={item.name} className="cart-item-thumbnail" />
            <div className="cart-item-details">
              <h4 className="cart-item-name">{item.name}</h4>
              <p className="cart-item-cost">Unit Price: ${item.cost}</p>
              <p className="cart-item-subtotal">Subtotal: ${calculateTotalCost(item)}</p>
              
              <div className="quantity-controls">
                <button className="quantity-btn" onClick={() => handleDecrement(item)}>-</button>
                <span className="quantity-val">{item.quantity}</span>
                <button className="quantity-btn" onClick={() => handleIncrement(item)}>+</button>
              </div>

              <button onClick={() => handleRemove(item.name)} className="delete-btn">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-actions">
        <button onClick={useNavigateToPlants} className="continue-shopping-btn">
          Continue Shopping
        </button>
        <button onClick={handleCheckout} className="checkout-btn">
          Checkout
        </button>
      </div>
    </div>
  );
}

export default CartItem;

