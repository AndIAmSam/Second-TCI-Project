import React, { useContext } from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import MyBlur from '../components/MyBlur';
import SecondBlur from "../components/SecondBlur";

const Home = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <Text style={[styles.heading, { color: theme.title }]}>
        Home Screen
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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
