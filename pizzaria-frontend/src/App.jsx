import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext'; // ✅ Importa o AuthProvider

import Header from './components/Header'; // o teu header com tema + carrinho
import Hero from './components/Hero';
import MenuPage from './pages/MenuPage';
import Checkout from './pages/Checkout';
import PaymentSimulation from './pages/PaymentSimulation';
import Login from './components/Login';
import Register from './components/Register';



function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <AuthProvider>
        <Router>
          <Header />
          
<Routes>
  <Route path="/" element={<Hero />} />
  <Route path="/menu" element={<MenuPage />} />
  <Route path="/checkout" element={<Checkout />} />
  <Route path="/payment" element={<PaymentSimulation />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
</Routes>


          <footer>© 2025 Pizzaria Tózas. Todos os direitos reservados.</footer>
        </Router>
        </AuthProvider>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
