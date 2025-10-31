import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import { Link } from 'react-router-dom';

export default function CartModal({ isOpen, onClose }) {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);

  if (!isOpen) return null;
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>Your Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <ul>
              {cart.map((item, index) => (
                <li key={index} className="cart-item">
                  <img src={item.image} alt={item.name} width={50} />
                  <div style={{ flex: 1, marginLeft: "10px" }}>
                    <strong>{item.name}</strong><br />
                    <span>{item.price.toFixed(2)} €</span><br />
                    <small>Total: {(item.price * item.quantity).toFixed(2)} €</small>
                  </div>
                  <div>
                    <button onClick={() => updateQuantity(index, -1)}>-</button>
                    <span style={{ margin: '0 10px' }}>{item.quantity}</span>
                    <button onClick={() => updateQuantity(index, 1)}>+</button>
                  </div>
                  <button onClick={() => removeFromCart(index)}>🗑️</button>
                </li>
              ))}
            </ul>
            <p><strong>Total: {total} €</strong></p>

            <Link to="/checkout">
              <button className="checkout-btn" onClick={onClose}>Finalizar Pedido</button>
            </Link>
          </>
        )}
        <button onClick={onClose} className="close-btn">Close</button>
      </div>
    </div>
  );
}
