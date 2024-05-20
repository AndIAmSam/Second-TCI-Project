import React, { createContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const lightTheme = {
    backgroundColor: "#fff",
    bottomBarBackgroundColor: "#fff",
    textColor: "#000",
    iconBackgroundColor: "#96cf8d",
  };

  const darkTheme = {
    backgroundColor: "#000",
    bottomBarBackgroundColor: "#000",
    textColor: "#fff",
    iconBackgroundColor: "#3b3b3b",
  };

  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
