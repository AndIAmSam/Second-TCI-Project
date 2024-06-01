import React, { createContext, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const lightTheme = {
    backgroundColor: "transparent",
    bottomBarBackgroundColor: "#fff",
    title: "#000",
    textColor: "#000",
    iconColor: "#000",
    iconInactiveColor: "#d9d9d9",
    iconBackgroundColor: "#d9d9d9",
    cardColor: "rgba(249,249,249,0.5)",
    buttonConfirmColor: "rgba(0, 113, 227, 0.6)",
    modalBackground: "rgba(255, 255, 255, 1)",
    buttonCancelColor: "#ff4d4f",
    blurBackground: "#fff",
  };

  const darkTheme = {
    backgroundColor: "transparent",
    bottomBarBackgroundColor: "#000",
    title: "#fff",
    textColor: "#fff",
    iconColor: "#fff",
    iconInactiveColor: "#a0a0a0",
    iconBackgroundColor: "#3b3b3b",
    cardColor: "rgba(0,0,0,0.5)",
    buttonConfirmColor: "rgba(0, 113, 227, 0.6)",
    buttonCancelColor: "#ff4d4f",
    blurBackground: "#000",
    modalBackground: "rgba(0, 0, 0, 1)",
    inputColor: "rgba(0,0,0,0.5)",
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
