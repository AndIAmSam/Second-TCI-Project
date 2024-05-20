// Navigation.js
import React, { useState, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { ThemeContext } from "../context/ThemeContext";
import Home from "../screens/Home";
import About from "../screens/About";
import Login from "../screens/Login";
import MyBlur from "../components/MyBlur";
import Welcome from "../screens/Welcome";
import SignIn from "../screens/SignIn";
import { Ionicons } from "@expo/vector-icons";

const Tab = createMaterialBottomTabNavigator();

const Navigation = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <NavigationContainer>
      <Tab.Navigator
        barStyle={{ backgroundColor: theme.bottomBarBackgroundColor }}
        activeColor={theme.textColor}
        inactiveColor="#c0c0c0"
        shifting={true}
        theme={{ colors: { secondaryContainer: theme.iconBackgroundColor } }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="home" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="About"
          component={About}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="information-circle" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Welcome"
          component={Welcome}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="information-circle" size={24} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
