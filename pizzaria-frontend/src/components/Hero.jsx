import React, { useEffect, useState } from 'react';
import "../index.css";
import { useCart } from '../contexts/CartContext';


const wallpapers = [
  '/assets/imgs/pizzapeperoniwallpaper.png',
  '/assets/imgs/pizzamargeritawallpaper.png',
  '/assets/imgs/pizzahawaianawallpaper.png',
  '/assets/imgs/pizza4_queijoswallpaper.png'
];

const pizzaImages = [
  '/assets/imgs/pizzapeperoni.png',
  '/assets/imgs/pizzamargerita.png',
  '/assets/imgs/pizzahawaiana.png',
  '/assets/imgs/pizza4_queijos.png'
];

const pizzaNames = ['Peperoni', 'Margherita', 'Hawaiana', '4 Queijos'];
const pizzaPrices = [12.5, 10, 11.5, 13];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % wallpapers.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (index) => {
    setCurrent(index);
  };

const { addToCart } = useCart();

  const handleOrder = () => {
    const selectedPizza = {
      name: pizzaNames[current],
      image: pizzaImages[current],
      price: pizzaPrices[current],
    };
    addToCart(selectedPizza);
    alert(`${pizzaNames[current]} adicionada ao carrinho!`);
  };


  return (
    <section
      className="hero slide-in"
      style={{ backgroundImage: `url(${wallpapers[current]})` }}
    >
      <div className="hero-text">
        <h1>Top Pizzas</h1>
        <p>
          As pizzas mais escolhidas pelos nossos fieis clientes.
          Não vais querer perder!
        </p>
        <div className="pizza-thumbs">
          {pizzaNames.map((name, index) => (
            <div
              key={index}
              className={`thumb ${index === current ? 'active' : ''}`}
              onClick={() => handleChange(index)}
            >
              <img
                src={pizzaImages[index]}
                alt={`Pizza ${name}`}
              />
              <span className="pizza-name">{name}</span>
            </div>
          ))}
        </div>
        <div className="hero-buttons">
          <button className="order-btn" onClick={handleOrder}>
            Order Now
          </button>
          <button className="see-more-btn">See More</button>
        </div>
      </div>
    </section>
  );
}
