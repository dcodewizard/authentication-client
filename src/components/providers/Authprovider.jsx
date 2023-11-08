import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children })  => {
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
