import React from 'react';
import { useCart } from '../contexts/CartContext';

const pizzas = [
  {
    name: 'Peperoni',
    image: '/assets/imgs/pizzapeperoni.png',
    price: 10.99
  },
  {
    name: 'Margherita',
    image: '/assets/imgs/pizzamargerita.png',
    price: 9.49
  },
  {
    name: 'Hawaiana',
    image: '/assets/imgs/pizzahawaiana.png',
    price: 11.25
  },
  {
    name: '4 Queijos',
    image: '/assets/imgs/pizza4_queijos.png',
    price: 12.50
  }
];

export default function MenuPage() {
  const { addToCart } = useCart();

  return (
    <section className="menu-page">
      <h2>Nosso Menu 🍕</h2>
      <div className="pizza-grid">
        {pizzas.map((pizza, index) => (
          <div key={index} className="pizza-card">
            <img src={pizza.image} alt={pizza.name} />
            <h3>{pizza.name}</h3>
            <p className="price">€{pizza.price.toFixed(2)}</p>
            <button onClick={() => addToCart(pizza)}>Adicionar ao Carrinho</button>
          </div>
        ))}
      </div>
    </section>
  );
}
