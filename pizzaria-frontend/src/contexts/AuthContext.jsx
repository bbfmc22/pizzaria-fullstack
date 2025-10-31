import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (email, password) => {
    // Simular login — aceita qualquer email com "@" e password >= 6 chars
    if (email.includes('@') && password.length >= 6) {
      const fakeUser = { email };
      setUser(fakeUser);
      localStorage.setItem('user', JSON.stringify(fakeUser));
      return { success: true };
    }
    return { success: false, message: 'Credenciais inválidas.' };
  };

  const register = (email, password, name) => {
    // Simular registo — validações básicas
    if (!email.includes('@')) return { success: false, message: 'Email inválido.' };
    if (password.length < 6) return { success: false, message: 'Password deve ter ao menos 6 caracteres.' };
    if (name.trim().length === 0) return { success: false, message: 'Nome é obrigatório.' };

    // Registo simulado: já loga automaticamente
    const fakeUser = { email, name };
    setUser(fakeUser);
    localStorage.setItem('user', JSON.stringify(fakeUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro do AuthProvider');
  }
  return context;
}
