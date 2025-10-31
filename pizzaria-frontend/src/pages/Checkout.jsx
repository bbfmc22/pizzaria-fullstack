import React from 'react';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const handleConfirm = () => {
    clearCart();
  navigate('/payment');
  };

  return (
    <div className="checkout-page">
      <h1 className="checkout-title">Resumo do Pedido</h1>

      {cartItems.length === 0 ? (
        <p className="empty-cart">O carrinho está vazio.</p>
      ) : (
        <>
          <ul className="checkout-list">
            {cartItems.map((item, index) => (
              <li key={index} className="checkout-item">
                <img src={item.image} alt={item.name} className="checkout-image" />
                <div className="checkout-details">
                  <h2>{item.name}</h2>
                  <p>{item.price.toFixed(2)}€ x {item.quantity}</p>
                  <p><strong>Total: {(item.price * item.quantity).toFixed(2)}€</strong></p>
                </div>
              </li>
            ))}
          </ul>

          <div className="checkout-summary">
            <p>Total Geral: <strong>{getTotalPrice().toFixed(2)}€</strong></p>
            <button className="confirm-button" onClick={handleConfirm}>Confirmar Pedido</button>
          </div>
        </>
      )}
    </div>
  );
}
