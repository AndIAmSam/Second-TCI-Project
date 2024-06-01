import React, { useContext, useState, useEffect } from "react";
import { View, Switch } from "react-native";
import { ThemeContext } from "../context/ThemeContext";

const ThemeSwitch = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isEnabled, setIsEnabled] = useState(theme.isDarkMode);

  useEffect(() => {
    setIsEnabled(theme.isDarkMode);
  }, [theme.isDarkMode]);

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    toggleTheme();
  };

  return (
    <View>
      <Switch
        trackColor={{ false: "#fff", true: "#000" }}
        thumbColor={isEnabled ? "#7653b3" : "orange"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
};

export default ThemeSwitch;
