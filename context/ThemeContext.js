import React, { createContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const lightTheme = {
    backgroundColor: "#fff",
    bottomBarBackgroundColor: "#fff",
    title: "#000",
    textColor: "#000",
    iconBackgroundColor: "#d9d9d9",
  };

  const darkTheme = {
    backgroundColor: "#000",
    bottomBarBackgroundColor: "#000",
    title: "#fff",
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
