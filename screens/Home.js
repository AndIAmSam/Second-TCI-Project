import React, { useContext } from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import MyBlur from '../components/MyBlur';
import SecondBlur from "../components/SecondBlur";

const Home = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <Text style={[styles.text, { color: theme.textColor }]}>
        Home Screen
      </Text>
      <View style={styles.switchContainer}>
        <Text style={[styles.text, { color: theme.textColor }]}>Modo Oscuro</Text>
        <Switch
          value={theme === "dark"}
          onValueChange={toggleTheme}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={theme === "dark" ? "#f4f3f4" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
});

export default Home;
