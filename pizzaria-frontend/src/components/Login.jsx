import React, { useState } from 'react';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './LoginRegister.css';




export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Preencha todos os campos');
      return;
    }

    // Simulação simples de login
    const success = login(email, password);

    if (success) {
      navigate('/'); // depois do login, vai para a home ou página que quiseres
    } else {
      setError('Email ou senha inválidos');
    }
  };

  return (
    <div className="auth-form">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="exemplo@dominio.com"
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="********"
          />
        </label>

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
