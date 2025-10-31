import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import CartModal from './CartModal';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext'; // ✅ Importa o useAuth
import { Link } from 'react-router-dom';
import ToggleSwitch from './ToggleSwitch';  // Importa o switch

export default function Header() {
  const { cartCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth(); // ✅ Acede ao utilizador autenticado e à função logout

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  return (
    <>
      <header>
        <div className="logo">Pizzaria Tózas</div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/menu">Menu</Link>
          <a></a>
          <ToggleSwitch />

          <a
            href="#"
            onClick={e => { e.preventDefault(); toggleCart(); }}
            style={{ marginLeft: '1rem' }}
          >
            Carrinho 🛒 {cartCount > 0 && <span>({cartCount})</span>}
          </a>

          {/* ✅ Botões de Login/Logout/Register */}
          {user ? (
            <>
              <span style={{ marginLeft: '1rem' }}>👋 {user.name}</span>
              <button onClick={logout} style={{ marginLeft: '1rem', backgroundColor: '#d33', color: '#fff', border: 'none', padding: '0.3rem 0.7rem', borderRadius: '5px', cursor: 'pointer' }}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ marginLeft: '1rem' }}>Login</Link>
              <Link to="/register" style={{ marginLeft: '1rem' }}>Registar</Link>
            </>
          )}
        </nav>
      </header>

      <CartModal isOpen={isCartOpen} onClose={toggleCart} />
    </>
  );
}
