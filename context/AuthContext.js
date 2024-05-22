// AuthContext.js
import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const signIn = () => {
    // Aquí podrías realizar la lógica de autenticación simulada, por ejemplo, cambiar isAuthenticated a true
    setIsAuthenticated(true);
  };

  const signOut = () => {
    // Aquí podrías realizar la lógica de cierre de sesión simulada, por ejemplo, cambiar isAuthenticated a false
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
