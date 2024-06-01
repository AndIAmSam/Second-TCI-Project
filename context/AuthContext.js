import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState('');
  const [email, setEmail] = useState('na');

  const signIn = async (user, newemail) => {
    setUserType(user);
    setEmail(newemail);
    setIsAuthenticated(true);
  };

  const signOut = () => {
    setIsAuthenticated(false);
  };

  const register = (formData) => {

  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, signOut, userType, email }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
