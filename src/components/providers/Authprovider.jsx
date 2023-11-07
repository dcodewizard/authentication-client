import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const login = () => {
    setIsAuthenticated(true);
    console.log('login called');
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const errorHandler = (error) => {
    // Implementing the error handling
    setError(error);
  };

  const Loader = (value) => {
    setIsLoading(value);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, error, errorHandler, isLoading, Loader }}>
      {children}
    </AuthContext.Provider>
  );
}
