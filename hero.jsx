// Hero.jsx
import React, { useEffect, useState } from 'react';
import './Hero.css'; // Este ficheiro é o equivalente ao stylesPIZZA.css

const wallpapers = [
  'assets/imgs/pizzapeperoniwallpaper.png',
  'assets/imgs/pizzamargeritawallpaper.png',
  'assets/imgs/pizzahawaianawallpaper.png',
  'assets/imgs/pizza4_queijoswallpaper.png'
];

const pizzaNames = ['Peperoni', 'Margherita', 'Hawaiana', '4 Queijos'];
const pizzaThumbs = [
  'assets/imgs/pizzapeperoni.png',
  'assets/imgs/pizzamargerita.png',
  'assets/imgs/pizzahawaiana.png',
  'assets/imgs/pizza4_queijos.png'
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % wallpapers.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const changePizza = (index) => {
    setCurrent(index);
  };

  const orderPizza = () => {
    alert("Pizza added to cart! (Simulado)");
  };

  return (
    <section
      className={`hero slide-in`}
      style={{ backgroundImage: `url('${wallpapers[current]}')` }}
    >
      <div className="hero-text">
        <h1>Pizza</h1>
        <p>
          Choose your healthy with millions of delicious possibilities made from
          simple whole ingredients.
        </p>

        <div className="pizza-thumbs">
          {pizzaThumbs.map((img, i) => (
            <div
              key={i}
              className={`thumb ${i === current ? 'active' : ''}`}
              onClick={() => changePizza(i)}
            >
              <img src={img} alt={`Pizza ${pizzaNames[i]}`} />
              <span className="pizza-name">{pizzaNames[i]}</span>
            </div>
          ))}
        </div>

        <div className="hero-buttons">
          <button className="order-btn" onClick={orderPizza}>
            Order Now
          </button>
          <button className="see-more-btn">See More</button>
        </div>
      </div>
    </section>
  );
}
