import React, { useState } from 'react';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './LoginRegister.css';




export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password || !passwordConfirm) {
      setError('Preencha todos os campos');
      return;
    }

    if (password !== passwordConfirm) {
      setError('As senhas não coincidem');
      return;
    }

    // Simulação simples de registo
    const success = register(email, password);

    if (success) {
      navigate('/login'); // Depois do registo vai para login
    } else {
      setError('Erro ao registar');
    }
  };

  return (
    <div className="auth-form">
      <h2>Registar</h2>
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

        <label>
          Confirmar Password:
          <input
            type="password"
            value={passwordConfirm}
            onChange={e => setPasswordConfirm(e.target.value)}
            placeholder="********"
          />
        </label>

        <button type="submit">Registar</button>
      </form>
    </div>
  );
}
